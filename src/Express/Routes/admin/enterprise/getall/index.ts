import express from "express";

import ReturnResponse from "../../../../Response";

import EnterpriseController from "../../../../../Controllers/Admin/enterprises";

export default async function EnterpriseGetAllAdmin(
  Req: express.Request,
  Res: express.Response
) {
  try {
    if (!Req.query.from)
      return Res.status(406).json(
        ReturnResponse(true, `Confira o campo "from"...`, null)
      );
    const Service = await EnterpriseController.GetAll(Number(Req.query.from!));

    return Res.status(Service.statusCode).json(
      ReturnResponse(Service.error, Service.message, Service.data)
    );
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Houve um erro, tente novamente mais tarde.")
    );
  }
}
