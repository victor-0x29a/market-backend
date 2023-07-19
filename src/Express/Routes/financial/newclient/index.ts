import express from "express";
import ReturnResponse from "../../../Response";
import ClientController from "../../../../Controllers/Financial/client";

export default async function NewClient(
  Req: express.Request,
  Res: express.Response
) {
  try {
    const Service = await ClientController.create(Req.body);
    return Res.status(Service.statusCode).json(
      ReturnResponse(Service.error, Service.message)
    );
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Tente novamente mais tarde!")
    );
  }
}
