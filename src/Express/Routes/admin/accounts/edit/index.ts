import express from "express";
import User from "../../../../../Database/models/user";
import { userEditAccountSchema } from "../../../../../Schemas/useredit";
import { ID } from "../../../../../Schemas/id";
import ReturnResponse from "../../../../Response";
import { userAccount } from "../../../../../types/user.options";

export default async function AccountEditRamAdmin(
  Req: express.Request,
  Res: express.Response
) {
  try {
    const id = ID.safeParse(Number(Req.query.id));
    if (!id.success)
      return Res.status(406).json(ReturnResponse(true, "Confira o ID!"));
    const Body = userEditAccountSchema.safeParse(Req.body);
    if (!Body.success)
      return Res.status(406).json(
        ReturnResponse(
          true,
          `Confira o campo '${Body.error.errors[0].path[0]}'`
        )
      );
    const usuario: userAccount | null = await User.findOne({
      where: {
        id: Number(Req.query.id),
      },
    });
    if (!usuario)
      return Res.status(404).json(
        ReturnResponse(
          true,
          "Confira o ID, pois nao foi possivel encontrar o usuario!"
        )
      );
    await User.update(
      {
        firstName: Req.body.firstName,
        role: Req.body.role,
        phone: Req.body.phone,
      },
      {
        where: {
          id: Number(Req.query.id),
        },
      }
    )
      .then(() => {
        return Res.status(204).json();
      })
      .catch((err) => {
        return Res.status(503).json(
          ReturnResponse(
            true,
            "Houve um erro interno ao salvar, tente novamente!"
          )
        );
      });
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Houve um erro, tente novamente mais tarde.")
    );
  }
}
