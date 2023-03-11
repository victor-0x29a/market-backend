import express from "express";
import Supplier from "../../../../../Database/models/supplier";
import ReturnResponse from "../../../../Response";
import { EnterpriseNewSchema } from "../../../../../Schemas/enterprise";
import supplierFace from "../../../../../types/supplier.options";
import { ID } from "../../../../../Schemas/id";

export default async function EnterpriseEditRamAdmin(
  Req: express.Request,
  Res: express.Response
) {
  try {
    const id = ID.safeParse(Number(Req.query.id));
    if (!id.success)
      return Res.status(406).json(ReturnResponse(true, "Confira o ID!"));
    const Body = EnterpriseNewSchema.safeParse(Req.body);
    if (!Body.success)
      return Res.status(406).json(
        ReturnResponse(true, Body.error.errors[0].message)
      );
    let empresa: supplierFace | null = await Supplier.findOne({
      where: { id: Number(Req.query.id) },
    });
    if (!empresa)
      return Res.status(404).json(
        ReturnResponse(
          true,
          "Opa, confira o ID, pois a empresa nao foi identificada."
        )
      );
    await Supplier.update(
      {
        name: Req.body.name,
        cnpj: Req.body.cnpj,
        email: Req.body.email,
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
      .catch(() => {
        return Res.status(503).json(
          ReturnResponse(true, "Houve um erro, tente novamente!")
        );
      });
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Houve um erro, tente novamente mais tarde.")
    );
  }
}
