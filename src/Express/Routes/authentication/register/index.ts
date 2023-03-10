import ReturnResponse from "../../../Response";
import express from "express";
import { z } from "zod";
import { userAccountSchema } from "../../../../Schemas/user";

export default async function register(
  req: express.Request,
  res: express.Response
) {
  try {
    const Body = userAccountSchema.safeParse(req.body);
    if (!Body.success)
      return res
        .status(406)
        .json(ReturnResponse(true, Body.error.errors[0].message));
  } catch (e) {
    return res.status(400).json(ReturnResponse(true, "Confira seu payload."));
  }
}
