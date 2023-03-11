import express from "express";
import ReturnResponse from "../../../Response";
import Cliente from "../../../../Database/models/client";
import { ClienteSchema } from "../../../../Schemas/client";
import { ClienteFace } from "../../../../types/client.options";

export default async function NewClient(
  Req: express.Request,
  Res: express.Response
) {
  try {
    const Body = ClienteSchema.safeParse(Req.body);
    if (!Body.success)
      return Res.status(406).json(
        ReturnResponse(
          true,
          `Confira o campo '${Body.error.errors[0].path[0]}'`
        )
      );
    const byCpf: ClienteFace | null = await Cliente.findOne({
      where: { cpf: Req.body.cpf },
    });
    if (byCpf)
      return Res.status(409).json(
        ReturnResponse(
          true,
          `Ja existe um cliente cadastrado com o mesmo CPF, chamado ${byCpf.name
            .toString()
            .toUpperCase()}.`
        )
      );
    await Cliente.create({
      name: Req.body.name,
      cpf: Req.body.cpf,
      phone: Req.body.phone,
      address: Req.body.address,
      complementAddress: Req.body.complementAddress,
      age: Req.body.age,
      sex: Req.body.sex,
    })
      .then(() => {
        return Res.status(201).json(
          ReturnResponse(false, "Cliente cadastrado!")
        );
      })
      .catch((err) => {
        return Res.status(503).json(
          ReturnResponse(
            true,
            "Houve um erro interno ao tentar cadastrar, verifique os dados fornecidos!"
          )
        );
      });
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Tente novamente mais tarde!")
    );
  }
}
