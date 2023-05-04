
import { response } from '../../types/controller.options'

import User from '../../Database/models/user'

import { userAccountSchema } from '../../Schemas/user'

import TokenWeb from '../../WebToken'

import { userAccountLoginSchema } from '../../Schemas/userlogin'

import { userAccount } from '../../types/user.options'

import genHash from './submodules/hashpass'

const AuthenticationController = {
  register: async (body: userAccount): Promise<response> => {

    const bodyValidation = userAccountSchema.safeParse(body);
    if (!bodyValidation.success)
      return {
        error: true,
        message: `Confira o campo ${bodyValidation.error.errors[0].path[0]}`,
        statusCode: 406
      }


    let findUser: object | null = await User.findOne({
      where: { firstName: body.firstName },
    });

    if (findUser)
      return {
        error: true,
        message: `Tente outro nome.`,
        statusCode: 409
      }


    const hashGenerate = await genHash(body.password)

    if (hashGenerate.error) return hashGenerate

    return await User.create({
      firstName: body.firstName,
      role: body.role,
      phone: body.phone,
      password: hashGenerate.message,
    })
      .then(() => {
        return {
          error: true,
          message: `Usuário cadastrado.`,
          statusCode: 201
        }
      })
      .catch((err) => {
        return {
          error: true,
          message: `Houve um erro inesperado.`,
          statusCode: 500
        }
      });

  },
  login: async (body: any) => {
    console.log(body)
  }
}

export default AuthenticationController
