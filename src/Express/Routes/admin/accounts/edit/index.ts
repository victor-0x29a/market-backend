import express from "express";

import ReturnResponse from "../../../../Response";

import UserController from "../../../../../Controllers/Admin/users";

export default async function AccountEditRamAdmin(
  Req: express.Request,
  Res: express.Response
) {
  try {
    const Service = await UserController.edit(Number(Req.query.id), Req.body);
    return Res.status(Service.statusCode).json(
      ReturnResponse(Service.error, Service.message)
    );
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Houve um erro, tente novamente mais tarde.")
    );
  }
}
