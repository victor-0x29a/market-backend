import express from "express";

import ReturnResponse from "../../../../Response";

import EnterpriseController from "../../../../../Controllers/Admin/enterprises";

export default async function EnterpriseEditRamAdmin(
  Req: express.Request,
  Res: express.Response
) {
  try {
    const Service = await EnterpriseController.Update(
      Req.query.id!.toString(),
      Req.body
    );
    return Res.status(Service.statusCode).json(
      ReturnResponse(Service.error, Service.message)
    );
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Houve um erro, tente novamente mais tarde.")
    );
  }
}
