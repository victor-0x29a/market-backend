import User from "../../Database/models/user";

import { userEditAccountSchema } from "../../Schemas/useredit";

import { ID } from "../../Schemas/id";

import { userAccount } from "../../types/user.options";

import { response } from "../../types/controller.options";

const UsersController = {
  edit: async (id: number, body: userAccount): Promise<response> => {
    const idValidation = ID.safeParse(id);
    if (!idValidation.success)
      return {
        error: true,
        message: "Confira o ID!",
        statusCode: 406,
      };

    const bodyValidation = userEditAccountSchema.safeParse(body);
    if (!bodyValidation.success)
      return {
        error: true,
        message: `Confira o campo ${bodyValidation.error.errors[0].path[0]}`,
        statusCode: 406,
      };

    const findUser: userAccount | null = await User.findOne({
      where: {
        id: Number(id),
      },
    });

    if (!findUser)
      return {
        error: true,
        message: `Usuário não encontrado!`,
        statusCode: 404,
      };

    return await User.update(
      {
        firstName: body.firstName,
        role: body.role,
        phone: body.phone,
      },
      {
        where: {
          id: id,
        },
      }
    )
      .then(() => {
        return {
          error: false,
          message: `Usuário modificado!`,
          statusCode: 204,
        };
      })
      .catch((err) => {
        return {
          error: true,
          message: `Houve um erro, confira os dados enviados!`,
          statusCode: 400,
        };
      });
  },
  getAll: async (): Promise<response> => {
    const Employers = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    return {
      error: false,
      statusCode: 200,
      data: Employers,
      message: "Todos os funcionários.",
    };
  },
  get: async (id: number): Promise<response> => {
    const findUser: userAccount | null = await User.findOne({
      where: {
        id: Number(id),
      },
      attributes: {
        exclude: ["password"],
      },
    });

    if (!findUser)
      return {
        error: true,
        message: `Usuário não encontrado!`,
        statusCode: 404,
      };
    return {
      error: false,
      message: `Funcionário #${findUser.id}`,
      data: findUser,
      statusCode: 200,
    };
  },
};

export default UsersController;
