import express from "express";

import ReturnResponse from "../../../../Response";

import EnterpriseController from "../../../../../Controllers/Admin/enterprises";

export default async function EnterpriseEditRamAdmin(
  Req: express.Request,
  Res: express.Response
) {
  try {
    await EnterpriseController.Update(Req.query.id!.toString(), Req.body)
      .then((data) => {
        return Res.status(data.statusCode).json(
          ReturnResponse(data.error, data.message)
        );
      })
      .catch((err) => {
        return Res.status(err.statusCode).json(
          ReturnResponse(err.error, err.message)
        );
      });
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Houve um erro, tente novamente mais tarde.")
    );
  }
}
