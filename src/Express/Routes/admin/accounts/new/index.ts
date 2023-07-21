import ReturnResponse from "../../../../Response";
import express from "express";
import AuthenticationController from "../../../../../Controllers/Auth";

export default async function register(
  req: express.Request,
  res: express.Response
) {
  try {
    const Service = await AuthenticationController.register(req.body);
    return res
      .status(Service.statusCode)
      .json(ReturnResponse(Service.error, Service.message, Service.data));
  } catch (e) {
    return res.status(400).json(ReturnResponse(true, "Confira seu payload."));
  }
}
