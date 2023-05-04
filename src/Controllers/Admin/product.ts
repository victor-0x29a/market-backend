
import Supplier from '../../Database/models/supplier'

import { response } from '../../types/controller.options'

import supplierFace from '../../types/supplier.options'

import Product from '../../Database/models/product'

import { ProductNewSchema } from '../../Schemas/product'

import { EditProductSchema } from '../../Schemas/editproduct'

import { productFace } from '../../types/product.options'

import { ID, Numerico } from '../../Schemas/id'

import { MethodsStock } from '../../Schemas/methodsstock'

import NormalStock from "../../Database/MongoDB/collections/sumStock";

import DelStock from "../../Database/MongoDB/collections/removestock";

import BreakDownStock from "../../Database/MongoDB/collections/breakdown"

import { decodedData } from '../../types/decodedData.options'

import { BARCHAR } from '../../Schemas/barchar'

const ProductController = {
  create: async (body: productFace): Promise<response> => {

    const bodyValidation = ProductNewSchema.safeParse(body)

    if (!bodyValidation.success) return {
      error: true,
      message: `Confira o campo ${bodyValidation.error.errors[0].path[0]}`,
      statusCode: 406
    }

    const findProduct: productFace | null = await Product.findOne({
      where: { barchar: body.barchar },
    })

    if (findProduct) return {
      error: true,
      message: `Já existe um produto com o mesmo código de barras!`,
      statusCode: 409
    }

    let supplier: supplierFace | null = await Supplier.findOne({
      where: { id: Number(body.enterprise) },
    });
    if (!supplier) return {
      error: true,
      message: `Confira a empresa, pois esta empresa não foi encontrada!`,
      statusCode: 404
    }

    return await Product.create({
      name: body.name,
      barchar: body.barchar,
      stock: body.stock ? body.stock : 0,
      replacement: body.replacement,
      enterprise: body.enterprise,
      price: body.price,
    }).then(() => {
      return {
        error: false,
        message: `Produto cadastrado!`,
        statusCode: 201
      }
    }).catch((err) => {
      return {
        error: true,
        message: `Houve um erro não esperado.`,
        statusCode: 400
      }
    })

  },
  edit: async (body: productFace): Promise<response> => {

    const idValidation = ID.safeParse(body.id)
    if (!idValidation.success) return {
      error: true, message: "Confira o ID!",
      statusCode: 406
    }

    const bodyValidation = EditProductSchema.safeParse(body)

    if (!bodyValidation.success) return {
      error: true,
      message: `Confira o campo ${bodyValidation.error.errors[0].path[0]}`,
      statusCode: 406
    }

    const findProduct: productFace | null = await Product.findOne({
      where: { id: body.id },
    })

    if (!findProduct) return {
      error: true,
      message: `Produto inexistente.`,
      statusCode: 404
    }

    let supplier: supplierFace | null = await Supplier.findOne({
      where: { id: Number(body.enterprise) },
    });

    if (!supplier) return {
      error: true,
      message: `Confira a empresa, pois esta empresa não foi encontrada!`,
      statusCode: 404
    }

    return await Product.update(
      {
        name: body.name,
        price: body.price,
        enterprise: body.enterprise,
        replacement: body.replacement,
      },
      {
        where: {
          id: Number(body.id),
        },
      }
    ).then(() => {
      return {
        error: false,
        message: `Produto atualizado!`,
        statusCode: 204
      }
    }).catch((err) => {
      return {
        error: true,
        message: `Houve um erro não esperado.`,
        statusCode: 400
      }
    })

  },
  stock: async (method: string, id: number, valor: number, usuario: decodedData): Promise<response> => {

    const idValidation = ID.safeParse(id)

    if (!idValidation.success) return {
      error: true, message: "Confira o ID.",
      statusCode: 406
    }

    const valueValidation = Numerico.safeParse(valor)

    if (!valueValidation.success) return {
      error: true, message: "Confira o VALOR indicado.",
      statusCode: 406
    }

    const methodValidation = MethodsStock.safeParse(method)

    if (!methodValidation.success) return {
      error: true,
      message: `O método de controle de estoque não foi encontrado!`,
      statusCode: 404
    }

    const findProduct: productFace | null = await Product.findOne({
      where: { id: id },
    })

    if (!findProduct) return {
      error: true,
      message: `Produto inexistente.`,
      statusCode: 404
    }

    switch (method) {
      case "add":
        const estoquePrevioAdicionar: number = findProduct.stock! + Number(valor);
        return await Product.update(
          {
            stock: estoquePrevioAdicionar,
          },
          {
            where: {
              id: Number(id),
            },
          }
        )
          .then(async () => {
            return await NormalStock.create({
              product: Number(id),
              user: usuario.id,
              total: Number(valor),
            })
              .then(() => {
                return {
                  error: false,
                  message: `Estoque atualizado.`,
                  statusCode: 204
                }
              })
              .catch(async (err: Error) => {
                await Product.update({
                  stock: findProduct.stock,
                },
                  {
                    where: {
                      id: Number(id),
                    },
                  })
                return {
                  error: true,
                  message: `Houve um erro interno que causou um conflito, mas já está sendo resolvido.`,
                  statusCode: 500
                }
              });
          })
          .catch((err: Error) => {
            return {
              error: true,
              message: `Houve um erro interno.`,
              statusCode: 400
            }
          });
      case "sub":
        const estoquePrevioRemover: number = findProduct.stock! - Number(valor);

        if (estoquePrevioRemover < 0) return {
          error: true,
          message: `Valor negativo não é possível registrar!.`,
          statusCode: 404
        }

        return await Product.update(
          {
            stock: estoquePrevioRemover,
          },
          {
            where: {
              id: Number(id),
            },
          }
        )
          .then(async () => {
            return await DelStock.create({
              product: Number(id),
              user: usuario.id,
              total: Number(valor),
            })
              .then(() => {
                return {
                  error: false,
                  message: `Estoque atualizado.`,
                  statusCode: 204
                }
              })
              .catch(async (err: Error) => {
                await Product.update({
                  stock: findProduct.stock,
                },
                  {
                    where: {
                      id: Number(id),
                    },
                  })
                return {
                  error: true,
                  message: `Houve um erro interno que causou um conflito, mas já está sendo resolvido.`,
                  statusCode: 500
                }
              });
          })
          .catch((err: Error) => {
            return {
              error: true,
              message: `Houve um erro interno.`,
              statusCode: 400
            }
          });
      case "break":
        let estoquePrevioBreakdown: number = findProduct.breakdownStock! - Number(valor);

        if (estoquePrevioBreakdown < 0) return {
          error: true,
          message: `Valor negativo não é possível registrar.`,
          statusCode: 404
        }

        return await Product.update(
          {
            stock: estoquePrevioBreakdown,
          },
          {
            where: {
              id: Number(id),
            },
          }
        )
          .then(async () => {
            return await BreakDownStock.create({
              product: Number(id),
              user: usuario.id,
              total: Number(valor),
            })
              .then(() => {
                return {
                  error: false,
                  message: `Estoque atualizado.`,
                  statusCode: 204
                }
              })
              .catch(async (err: Error) => {
                await Product.update({
                  stock: findProduct.stock,
                },
                  {
                    where: {
                      id: Number(id),
                    },
                  })
                return {
                  error: true,
                  message: `Houve um erro interno que causou um conflito, mas já está sendo resolvido.`,
                  statusCode: 500
                }
              });
          })
          .catch((err: Error) => {
            return {
              error: true,
              message: `Houve um erro interno.`,
              statusCode: 400
            }
          });
      default:
        return {
          error: true,
          message: `O método de controle de estoque não foi encontrado!`,
          statusCode: 404
        }
    }
  },
  get: async (method: "id" | "barchar", identifier: number): Promise<response> => {
    switch (method) {
      case "id":
        const idValidation = ID.safeParse(identifier)

        if (!idValidation.success) return {
          error: true, message: "Confira o ID.",
          statusCode: 400
        }

        const findProduct: productFace | null = await Product.findOne({
          where: { id: identifier }, include: [
            { model: Supplier }
          ]
        })
        if (!findProduct) return {
          error: true, message: "Produto não encontrado.",
          statusCode: 404
        }

        return {
          error: false, message: findProduct,
          statusCode: 200
        }

      case "barchar":

        const barcharValidation = BARCHAR.safeParse(identifier.toString())

        if (!barcharValidation.success) return {
          error: true, message: "Confira o código de barras.",
          statusCode: 400
        }
        const findProductBar: productFace | null = await Product.findOne({
          where: { barchar: identifier.toString() }, include: [
            { model: Supplier }
          ]
        })
        if (!findProductBar) return {
          error: true, message: "Produto não encontrado.",
          statusCode: 404
        }

        return {
          error: false, message: findProductBar,
          statusCode: 200
        }

      default:
        return {
          error: true, message: "Método de pesquisa incorreto.",
          statusCode: 400
        }
    }
  },
  getAll: async (): Promise<response> => {
    return await Product.findAll().then((data) => {
      return {
        error: false, message: data,
        statusCode: 200
      }
    }).catch((err) => {
      return {
        error: true, message: "Houve um erro inesperado.",
        statusCode: 500
      }
    })
  }
}

export default ProductController
