import { response } from "../../types/controller.options";

import User from "../../Database/models/user";

import { userAccountSchema } from "../../Schemas/user";

import TokenWeb from "../../WebToken";

import { userAccountLoginSchema } from "../../Schemas/userlogin";

import { userAccount } from "../../types/user.options";

import genHash from "./submodules/hashpass";

import Bcrypt from "bcrypt";

const AuthenticationController = {
  register: async (body: userAccount): Promise<response> => {
    const bodyValidation = userAccountSchema.safeParse(body);
    if (!bodyValidation.success)
      return {
        error: true,
        message: `Confira o campo ${bodyValidation.error.errors[0].path[0]}`,
        statusCode: 406,
      };

    let findUser: object | null = await User.findOne({
      where: { firstName: body.firstName },
    });

    if (findUser)
      return {
        error: true,
        message: `Tente outro nome.`,
        statusCode: 409,
      };

    const hashGenerate = await genHash(body.password);

    if (hashGenerate.error) return hashGenerate;

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
          statusCode: 201,
        };
      })
      .catch((err) => {
        return {
          error: true,
          message: `Houve um erro inesperado.`,
          statusCode: 500,
        };
      });
  },
  login: async (body: userAccount): Promise<response> => {
    const Body = userAccountLoginSchema.safeParse(body);
    if (!Body.success)
      return {
        error: true,
        message: `Confira o campo ${Body.error.errors[0].path[0]}`,
        statusCode: 406,
      };

    const user: userAccount | null = await User.findOne({
      where: { firstName: body.firstName },
    });

    if (!user)
      return {
        error: true,
        message: `Credenciais inválidas.`,
        statusCode: 400,
      };
    return Bcrypt.compare(body.password, user.password)
      .then(() => {
        let jwt: boolean | string = TokenWeb.generate(user.id!, user.role);
        if (!jwt)
          return {
            error: true,
            message: "Houve um erro inesperado.",
            data: null,
            statusCode: 200,
          };
        return {
          error: false,
          message: "Bem-Vindo.",
          data: {
            jwt: jwt,
          },
          statusCode: 200,
        };
      })
      .catch((err) => {
        return {
          error: true,
          message: `Credenciais inválidas.`,
          statusCode: 400,
        };
      });
  },
};

export default AuthenticationController;
