import express from "express";

import ReturnResponse from "../../../../Response";

import EnterpriseController from "../../../../../Controllers/Admin/enterprises";

export default async function EnterpriseGetAdmin(
  Req: express.Request,
  Res: express.Response
) {
  try {
    if (!Req.query.cnpj)
      return Res.status(406).json(
        ReturnResponse(true, "Confira o CNPJ!", null)
      );
    const Service = await EnterpriseController.Get(Number(Req.query.cnpj!));

    return Res.status(Service.statusCode).json(
      ReturnResponse(Service.error, Service.message, Service.data)
    );
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Houve um erro, tente novamente mais tarde.")
    );
  }
}
