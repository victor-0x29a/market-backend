import express from "express";
import Supplier from "../../../../../Database/models/supplier";
import ReturnResponse from "../../../../Response";
import { EnterpriseNewSchema } from "../../../../../Schemas/enterprise";
import supplierFace from "../../../../../types/supplier.options";

export default async function EnterpriseNewRamAdmin(
  Req: express.Request,
  Res: express.Response
) {
  try {
    const Body = EnterpriseNewSchema.safeParse(Req.body);
    if (!Body.success)
      return Res.status(406).json(
        ReturnResponse(true, Body.error.errors[0].message)
      );
    let empresa: supplierFace | null = await Supplier.findOne({
      where: { cnpj: Number(Req.body.cnpj) },
    });
    if (empresa)
      return Res.status(409).json(
        ReturnResponse(
          true,
          "Opa, confira o CNPJ, pois ja existe uma empresa cadastrada com o mesmo."
        )
      );
    await Supplier.create({
      name: Req.body.name,
      cnpj: Req.body.cnpj,
      phone: Req.body.phone,
      email: Req.body.email,
    })
      .then(() => {
        return Res.status(201).json(
          ReturnResponse(false, { Message: "Empresa cadastrada." })
        );
      })
      .catch((err) => {
        return Res.status(503).json(
          ReturnResponse(false, {
            Message: "Tente novamente mais tarde, hove um erro interno.",
          })
        );
      });
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Houve um erro, tente novamente mais tarde.")
    );
  }
}
