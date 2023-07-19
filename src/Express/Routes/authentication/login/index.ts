import ReturnResponse from "../../../Response";
import express from "express";
import { userAccountLoginSchema } from "../../../../Schemas/userlogin";
import userAccount from "../../../../types/user.options";
import User from "../../../../Database/models/user";
import bcrypt from "bcrypt";
import TokenWeb from "../../../../WebToken/index";

export default async function login(
  req: express.Request,
  res: express.Response
) {
  try {
    const Body = userAccountLoginSchema.safeParse(req.body);
    if (!Body.success)
      return res
        .status(406)
        .json(
          ReturnResponse(
            true,
            `Confira o campo '${Body.error.errors[0].path[0]}'`
          )
        );

    const user: userAccount | null = await User.findOne({
      where: { firstName: req.body.firstName },
    });
    if (!user)
      return res.status(404).json(ReturnResponse(true, "Confira seu nome!"));
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err)
        return res
          .status(500)
          .json(
            ReturnResponse(
              true,
              "Houve um erro interno, tente novamente mais tarde..."
            )
          );
      if (!result)
        return res.status(401).json(ReturnResponse(true, "Tente novamente"));

      let jwt: boolean | string = TokenWeb.generate(user.id!, user.role);
      if (!jwt)
        return res
          .status(503)
          .json(ReturnResponse(true, "Tente novamente mais tarde!"));
      return res
        .status(200)
        .json(ReturnResponse(false, "Bem-vindo!", { jwt: jwt }));
    });
  } catch (e) {
    return res.status(400).json(ReturnResponse(true, "Confira seu payload."));
  }
}
