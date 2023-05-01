import express from "express";

import ReturnResponse from "../../../../Response";

import UserController from '../../../../../Controllers/Admin/users'

export default async function AccountEditRamAdmin(
  Req: express.Request,
  Res: express.Response
) {
  try {

    await UserController.edit(Number(Req.query.id), Req.body).then((data) => {
      return Res.status(data.statusCode).json(ReturnResponse(data.error, data.message))
    }).catch((err) => {
      return Res.status(err.statusCode).json(ReturnResponse(err.error, err.message))
    })

  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Houve um erro, tente novamente mais tarde.")
    );
  }
}
