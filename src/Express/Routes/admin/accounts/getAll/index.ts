import express from "express";

import ReturnResponse from "../../../../Response";

import UserController from "../../../../../Controllers/Admin/users";

export default async function AccountGetAllRamAdmin(
  Req: express.Request,
  Res: express.Response
) {
  try {
    const Service = await UserController.getAll();
    return Res.status(Service.statusCode).json(
      ReturnResponse(Service.error, Service.message, Service.data)
    );
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Houve um erro, tente novamente mais tarde.")
    );
  }
}
