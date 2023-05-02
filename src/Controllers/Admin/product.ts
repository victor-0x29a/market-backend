
import Supplier from '../../Database/models/supplier'

import { response } from '../../types/controller.options'

import supplierFace from '../../types/supplier.options'

import Product from '../../Database/models/product'

import { ProductNewSchema } from '../../Schemas/product'

import { productFace } from '../../types/product.options'

const ProductController = {
  create: async (body: productFace) => {

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

  }
}

export default ProductController
