import ReturnResponse from "../../../Response";
import express from "express";
import { userAccountLoginSchema } from "../../../../Schemas/userlogin";
import userAccount from "../../../../types/user.options";
import User from "../../../../Database/models/user";
import bcrypt from "bcrypt";
import TokenWeb from "../../../../WebToken/index";
import AuthenticationController from "../../../../Controllers/Auth";

export default async function login(
  req: express.Request,
  res: express.Response
) {
  try {
    const Body = req.body as userAccount;

    const Service = await AuthenticationController.login(Body);
    return res
      .status(Service.statusCode)
      .json(ReturnResponse(Service.error, Service.message, Service.data));
  } catch (e) {
    return res.status(400).json(ReturnResponse(true, "Confira seu payload."));
  }
}
