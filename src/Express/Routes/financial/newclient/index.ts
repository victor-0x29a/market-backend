import express from "express";
import ReturnResponse from "../../../Response";
import Cliente from "../../../../Database/models/client";
import { ClienteSchema } from "../../../../Schemas/client";
import { ClienteFace } from "../../../../types/client.options";
import ClientController from '../../../../Controllers/Financial/client'

export default async function NewClient(
  Req: express.Request,
  Res: express.Response
) {
  try {
    await ClientController.create(Req.body).then((data) => {
      return Res.status(data.statusCode).json(ReturnResponse(data.error, data.message))
    }).catch((err) => {
      return Res.status(err.statusCode).json(ReturnResponse(err.error, err.message))
    })

  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Tente novamente mais tarde!")
    );
  }
}
