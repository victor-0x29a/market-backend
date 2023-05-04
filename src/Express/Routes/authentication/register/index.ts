import ReturnResponse from "../../../Response";
import express from "express";
import { userAccountSchema } from "../../../../Schemas/user";
import User from "../../../../Database/models/user";
import bcrypt from "bcrypt";

import AuthenticationController from '../../../../Controllers/Auth'

export default async function register(
  req: express.Request,
  res: express.Response
) {
  try {
    await AuthenticationController.register(req.body).then((data) => {
      return res.status(data.statusCode).json(ReturnResponse(data.error, data.message))
    }).catch((err) => {
      return res.status(err.statusCode).json(ReturnResponse(err.error, err.message))
    })

  } catch (e) {
    return res.status(400).json(ReturnResponse(true, "Confira seu payload."));
  }
}
