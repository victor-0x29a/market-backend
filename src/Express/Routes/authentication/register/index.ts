import ReturnResponse from "../../../Response";
import express from "express";
export default async function register(
  req: express.Request,
  res: express.Response
) {
  try {
  } catch (e) {
    return res.status(400).json(ReturnResponse(true, "Confira seu payload."));
  }
}
