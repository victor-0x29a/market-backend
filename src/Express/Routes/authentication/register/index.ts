import ReturnResponse from "../../../Response";
import { z } from "zod";
import express from "express";
export default async function register(
  req: express.Request,
  res: express.Response
) {
  try {
    const user = req.body;
  } catch (e) {
    return res.status(400).json(ReturnResponse(true, "Confira seu payload."));
  }
}
