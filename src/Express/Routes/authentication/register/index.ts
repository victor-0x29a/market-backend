import ReturnResponse from "../../../Response";
import express from "express";
import { userAccountSchema } from "../../../../Schemas/user";
import User from "../../../../Database/models/user";
import bcrypt from "bcrypt";

export default async function register(
  req: express.Request,
  res: express.Response
) {
  try {
    const Body = userAccountSchema.safeParse(req.body);
    if (!Body.success)
      return res
        .status(406)
        .json(
          ReturnResponse(
            true,
            `Confira o campo '${Body.error.errors[0].path[0]}'`
          )
        );

    let user: object | null = await User.findOne({
      where: { firstName: req.body.firstName },
    });
    if (user)
      return res
        .status(406)
        .json(ReturnResponse(true, "Tente outro nome de usuario..."));
    let randomSalt: number = Math.floor(Math.random() * 9);
    bcrypt.hash(
      req.body.password,
      randomSalt,
      async (err: any, hash: string | undefined) => {
        if (err)
          return res
            .status(500)
            .json(
              ReturnResponse(
                true,
                "Tente novamente mais tarde, houve um erro interno..."
              )
            );
        if (hash) {
          await User.create({
            firstName: req.body.firstName,
            role: req.body.role,
            phone: req.body.phone,
            password: hash,
          })
            .then(() => {
              return res
                .status(201)
                .json(ReturnResponse(false, "Conta registrada!"));
            })
            .catch((err) => {
              return res
                .status(500)
                .json(
                  ReturnResponse(
                    true,
                    "Houve um erro interno, volte mais tarde."
                  )
                );
            });
        }
      }
    );
  } catch (e) {
    return res.status(400).json(ReturnResponse(true, "Confira seu payload."));
  }
}
