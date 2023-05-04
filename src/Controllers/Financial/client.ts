import { ClienteFace } from '../../types/client.options'

import { ClienteSchema } from '../../Schemas/client'

import Cliente from '../../Database/models/client'

import { response } from '../../types/controller.options'

const ClientController = {
  create: async (body: ClienteFace): Promise<response> => {

    const bodyValidation = ClienteSchema.safeParse(body)

    if (!bodyValidation.success) return {
      error: true,
      message: `Confira o campo ${bodyValidation.error.errors[0].path[0]}`,
      statusCode: 406
    }

    const findClient = await Cliente.findOne({ where: { cpf: body.cpf } })

    if (findClient) return {
      error: true,
      message: `Já existe uma pessoa com o mesmo CPF.`,
      statusCode: 409
    }

    return await Cliente.create({
      name: body.name,
      cpf: body.cpf,
      phone: body.phone,
      address: body.address,
      complementAddress: body.complementAddress,
      age: body.age,
      sex: body.sex,
    }).then(() => {
      return {
        error: false,
        message: `Cliente cadastrado.`,
        statusCode: 201
      }
    }).catch((err: Error) => {
      return {
        error: true,
        message: `Houve um erro inesperado.`,
        statusCode: 500
      }
    })
  }
}

export default ClientController
