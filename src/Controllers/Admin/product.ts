import { response } from "../../types/controller.options";

import { ProductNewSchema } from "../../Schemas/product";

import { EditProductSchema } from "../../Schemas/editproduct";

import { productFace } from "../../types/product.options";

import { ID, Numerico } from "../../Schemas/id";

import Elastic from "../../Elastic";

import { v4 } from "uuid";

import { decodedData } from "../../types/decodedData.options";

import { MethodsStock } from "../../Schemas/methodsstock";

import { estypes } from "@elastic/elasticsearch";

import { BARCHAR } from "../../Schemas/barchar";
/*
const ProductController = {
  create: async (body: productFace): Promise<response> => {
    const bodyValidation = ProductNewSchema.safeParse(body);

    if (!bodyValidation.success)
      return {
        error: true,
        message: `Confira o campo ${bodyValidation.error.errors[0].path[0]}`,
        statusCode: 406,
      };

    const findProduct: productFace | null = await Product.findOne({
      where: { barchar: body.barchar },
    });

    if (findProduct)
      return {
        error: true,
        message: `Já existe um produto com o mesmo código de barras!`,
        statusCode: 409,
      };

    let supplier: supplierFace | null = await Supplier.findOne({
      where: { id: Number(body.enterprise) },
    });
    if (!supplier)
      return {
        error: true,
        message: `Confira a empresa, pois esta empresa não foi encontrada!`,
        statusCode: 404,
      };

    return await Product.create({
      name: body.name,
      barchar: body.barchar,
      stock: body.stock ? body.stock : 0,
      replacement: body.replacement,
      enterprise: body.enterprise,
      price: body.price,
    })
      .then(() => {
        return {
          error: false,
          message: `Produto cadastrado!`,
          statusCode: 201,
        };
      })
      .catch((err) => {
        return {
          error: true,
          message: `Houve um erro não esperado.`,
          statusCode: 400,
        };
      });
  },
  edit: async (body: productFace): Promise<response> => {
    const idValidation = ID.safeParse(body.id);
    if (!idValidation.success)
      return {
        error: true,
        message: "Confira o ID!",
        statusCode: 406,
      };

    const bodyValidation = EditProductSchema.safeParse(body);

    if (!bodyValidation.success)
      return {
        error: true,
        message: `Confira o campo ${bodyValidation.error.errors[0].path[0]}`,
        statusCode: 406,
      };

    const findProduct: productFace | null = await Product.findOne({
      where: { id: body.id },
    });

    if (!findProduct)
      return {
        error: true,
        message: `Produto inexistente.`,
        statusCode: 404,
      };

    let supplier: supplierFace | null = await Supplier.findOne({
      where: { id: Number(body.enterprise) },
    });

    if (!supplier)
      return {
        error: true,
        message: `Confira a empresa, pois esta empresa não foi encontrada!`,
        statusCode: 404,
      };

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
    )
      .then(() => {
        return {
          error: false,
          message: `Produto atualizado!`,
          statusCode: 204,
        };
      })
      .catch((err) => {
        return {
          error: true,
          message: `Houve um erro não esperado.`,
          statusCode: 400,
        };
      });
  },
  stock: async (
    method: string,
    id: number,
    valor: number,
    usuario: decodedData
  ): Promise<response> => {
    const idValidation = ID.safeParse(id);

    if (!idValidation.success)
      return {
        error: true,
        message: "Confira o ID.",
        statusCode: 406,
      };

    const valueValidation = Numerico.safeParse(valor);

    if (!valueValidation.success)
      return {
        error: true,
        message: "Confira o VALOR indicado.",
        statusCode: 406,
      };

    const methodValidation = MethodsStock.safeParse(method);

    if (!methodValidation.success)
      return {
        error: true,
        message: `O método de controle de estoque não foi encontrado!`,
        statusCode: 404,
      };

    const findProduct: productFace | null = await Product.findOne({
      where: { id: id },
    });

    if (!findProduct)
      return {
        error: true,
        message: `Produto inexistente.`,
        statusCode: 404,
      };

    switch (method) {
      case "add":
        const estoquePrevioAdicionar: number =
          findProduct.stock! + Number(valor);

      case "sub":
        const estoquePrevioRemover: number = findProduct.stock! - Number(valor);

        if (estoquePrevioRemover < 0)
          return {
            error: true,
            message: `Valor negativo não é possível registrar!.`,
            statusCode: 404,
          };

      case "break":
        let estoquePrevioBreakdown: number =
          findProduct.breakdownStock! - Number(valor);

        if (estoquePrevioBreakdown < 0)
          return {
            error: true,
            message: `Valor negativo não é possível registrar.`,
            statusCode: 404,
          };

      default:
        return {
          error: true,
          message: `O método de controle de estoque não foi encontrado!`,
          statusCode: 404,
        };
    }
  },
  get: async (
    method: "id" | "barchar",
    identifier: number
  ): Promise<response> => {
    switch (method) {
      case "id":
        const idValidation = ID.safeParse(identifier);

        if (!idValidation.success)
          return {
            error: true,
            message: "Confira o ID.",
            statusCode: 400,
          };

        const findProduct: productFace | null = await Product.findOne({
          where: { id: identifier },
          include: [{ model: Supplier }],
        });
        if (!findProduct)
          return {
            error: true,
            message: "Produto não encontrado.",
            statusCode: 404,
          };

        return {
          error: false,
          message: findProduct,
          statusCode: 200,
        };

      case "barchar":
        const barcharValidation = BARCHAR.safeParse(identifier.toString());

        if (!barcharValidation.success)
          return {
            error: true,
            message: "Confira o código de barras.",
            statusCode: 400,
          };
        const findProductBar: productFace | null = await Product.findOne({
          where: { barchar: identifier.toString() },
          include: [{ model: Supplier }],
        });
        if (!findProductBar)
          return {
            error: true,
            message: "Produto não encontrado.",
            statusCode: 404,
          };

        return {
          error: false,
          message: findProductBar,
          statusCode: 200,
        };

      default:
        return {
          error: true,
          message: "Método de pesquisa incorreto.",
          statusCode: 400,
        };
    }
  },
  getAll: async (): Promise<response> => {
    return await Product.findAll()
      .then((data) => {
        return {
          error: false,
          message: data,
          statusCode: 200,
        };
      })
      .catch((err) => {
        return {
          error: true,
          message: "Houve um erro inesperado.",
          statusCode: 500,
        };
      });
  },
};
*/
class ProductController {
  public async Create(body: productFace): Promise<response> {
    try {
      const bodyValidation = ProductNewSchema.safeParse(body);

      if (!bodyValidation.success)
        return {
          error: true,
          message: `Confira o campo ${bodyValidation.error.errors[0].path[0]}`,
          statusCode: 406,
        };

      const FindCompany = await Elastic.Client.search({
        index: "market_companies",
        size: 1,
        query: {
          match: {
            _id: body.enterprise,
          },
        },
      });

      if (FindCompany.hits.hits.length < 1)
        return {
          error: true,
          message: `Confira a empresa fornecedora.`,
          statusCode: 400,
        };

      const FindProduct = await Elastic.Client.search({
        index: "market_products",
        size: 1,
        query: {
          match: {
            barchar: body.barchar,
          },
        },
      });
      if (FindProduct.hits.hits.length > 0) {
        return {
          error: true,
          message: `Já existe um produto com o mesmo código de barras!`,
          statusCode: 409,
        };
      }

      const UUIDGENERATED = v4();
      return await Elastic.Client.create({
        index: "market_products",
        id: UUIDGENERATED,
        document: {
          barchar: body.barchar,
          name: body.name,
          stock: body.stock,
          breakdownStock: 0,
          hasReplacement: body.hasReplacement,
          enterprise: body.enterprise,
          price: body.price,
          timestamp: new Date(),
        },
      })
        .then(() => {
          return {
            error: false,
            message: `Produto cadastrado.`,
            statusCode: 201,
          };
        })
        .catch((err) => {
          return {
            error: true,
            message: `Houve um erro interno.`,
            statusCode: 500,
          };
        });
    } catch (e) {
      return {
        error: true,
        message: `Houve um erro interno.`,
        statusCode: 500,
      };
    }
  }
  public async Update(body: productFace): Promise<response> {
    try {
      const idValidation = ID.safeParse(body.id);
      if (!idValidation.success)
        return {
          error: true,
          message: "Confira o ID!",
          statusCode: 406,
        };

      const bodyValidation = EditProductSchema.safeParse(body);

      if (!bodyValidation.success)
        return {
          error: true,
          message: `Confira o campo ${bodyValidation.error.errors[0].path[0]}`,
          statusCode: 406,
        };

      const FindProduct = await Elastic.Client.search({
        index: "market_products",
        size: 1,
        query: {
          match: {
            _id: body.id,
          },
        },
      });

      if (FindProduct.hits.hits.length < 1)
        return {
          error: true,
          message: `Produto inexistente.`,
          statusCode: 404,
        };

      const FindCompany = await Elastic.Client.search({
        index: "market_companies",
        size: 1,
        query: {
          match: {
            _id: body.enterprise,
          },
        },
      });

      if (FindCompany.hits.hits.length < 1)
        return {
          error: true,
          message: `Confira a empresa fornecedora.`,
          statusCode: 400,
        };

      return await Elastic.Client.update({
        index: "market_products",
        id: body.id!,
        doc: {
          name: body.name,
          stock: body.stock,
          hasReplacement: body.hasReplacement,
          enterprise: body.enterprise,
          price: body.price,
          timestamp: new Date(),
        },
      })
        .then(() => {
          return {
            error: false,
            message: `Produto modificado.`,
            statusCode: 204,
          };
        })
        .catch((err) => {
          return {
            error: true,
            message: `Tente novamente mais tarde.`,
            statusCode: 500,
          };
        });
    } catch (e) {
      return {
        error: true,
        message: `Houve um erro interno.`,
        statusCode: 500,
      };
    }
  }
  public async UpdateStock(
    method: string,
    id: string,
    valor: number,
    usuario: decodedData
  ): Promise<response> {
    const idValidation = ID.safeParse(id);

    if (!idValidation.success)
      return {
        error: true,
        message: "Confira o ID.",
        statusCode: 406,
      };

    const valueValidation = Numerico.safeParse(valor);

    if (!valueValidation.success)
      return {
        error: true,
        message: "Confira o VALOR indicado.",
        statusCode: 406,
      };

    const methodValidation = MethodsStock.safeParse(method);

    if (!methodValidation.success)
      return {
        error: true,
        message: `O método de controle de estoque não foi encontrado!`,
        statusCode: 400,
      };

    const FindProduct = await Elastic.Client.search({
      index: "market_products",
      size: 1,
      query: {
        match: {
          _id: id,
        },
      },
    });

    if (FindProduct.hits.hits.length < 1)
      return {
        error: true,
        message: "Nenhum produto encontrado.",
        statusCode: 404,
      };

    const Product = FindProduct.hits.hits[0]._source as productFace;
    const stock = Product.stock ? Product.stock : 0;
    const breakdownStock = Product.breakdownStock ? Product.breakdownStock : 0;

    switch (method) {
      case "add":
        return await Elastic.Client.update({
          index: "market_products",
          id: id,
          doc: {
            stock: stock + valor,
          },
        })
          .then(() => {
            return {
              error: false,
              message: "Modificado.",
              statusCode: 204,
            };
          })
          .catch(() => {
            return {
              error: true,
              message: "Houve um erro interno, tente novamente mais tarde.",
              statusCode: 500,
            };
          });
      case "sub":
        return await Elastic.Client.update({
          index: "market_products",
          id: id,
          doc: {
            stock: stock - valor,
            breakdownStock: breakdownStock + valor,
          },
        })
          .then(() => {
            return {
              error: false,
              message: "Modificado.",
              statusCode: 204,
            };
          })
          .catch(() => {
            return {
              error: true,
              message: "Houve um erro interno, tente novamente mais tarde.",
              statusCode: 500,
            };
          });
      case "break":
        return await Elastic.Client.update({
          index: "market_products",
          id: id,
          doc: {
            stock: stock - valor,
            breakdownStock: breakdownStock + valor,
          },
        })
          .then(() => {
            return {
              error: false,
              message: "Modificado.",
              statusCode: 204,
            };
          })
          .catch(() => {
            return {
              error: true,
              message: "Houve um erro interno, tente novamente mais tarde.",
              statusCode: 500,
            };
          });
      default:
        return {
          error: true,
          message: `O método de controle de estoque não foi encontrado!`,
          statusCode: 400,
        };
    }
  }
  public async Get(method: string, identifier: string): Promise<response> {
    if (method === "id") {
      const idValidation = ID.safeParse(identifier);

      if (!idValidation.success)
        return {
          error: true,
          message: "Confira o ID.",
          statusCode: 400,
        };

      const FindProduct = await Elastic.Client.search({
        index: "market_products",
        size: 1,
        query: {
          match: {
            _id: identifier,
          },
        },
      });

      if (FindProduct.hits.hits.length < 1)
        return {
          error: true,
          message: "Produto não encontrado.",
          statusCode: 404,
        };

      return {
        error: false,
        message: "Produto encontrado.",
        data: FindProduct.hits.hits[0]._source,
        statusCode: 200,
      };
    } else {
      const barcharValidation = BARCHAR.safeParse(identifier.toString());

      if (!barcharValidation.success)
        return {
          error: true,
          message: "Confira o código de barras.",
          statusCode: 400,
        };

      const FindProduct = await Elastic.Client.search({
        index: "market_products",
        size: 1,
        query: {
          match: {
            barchar: identifier,
          },
        },
      });

      if (FindProduct.hits.hits.length < 1)
        return {
          error: true,
          message: "Produto não encontrado.",
          statusCode: 404,
        };

      return {
        error: false,
        message: "Produto encontrado.",
        statusCode: 200,
        data: FindProduct.hits.hits[0]._source,
      };
    }
  }
  public async GetAll(from: number): Promise<response> {
    try {
      const From = from ? from : 0;
      const data = await Elastic.Client.search({
        index: "market_products",
        size: 100,
        from: From,
      });
      return {
        error: false,
        message: "Todos os produtos.",
        statusCode: 200,
        data: data.hits.hits,
      };
    } catch (e) {
      return {
        error: true,
        message: "Houve um erro interno.",
        statusCode: 500,
      };
    }
  }
}

export default new ProductController();
