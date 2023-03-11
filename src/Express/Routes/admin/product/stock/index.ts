import express from "express";
import Product from "../../../../../Database/models/product";
import { ID, Numerico, Method } from "../../../../../Schemas/id";
import { MethodsStock } from "../../../../../Schemas/methodsstock";
import ReturnResponse from "../../../../Response";

export default async function ProductStockRamAdmin(
  Req: express.Request,
  Res: express.Response
) {
  try {
    const id = ID.safeParse(Number(Req.query.id));
    if (!id.success)
      return Res.status(406).json(ReturnResponse(true, "Confira o ID!"));
    const value = Numerico.safeParse(Number(Req.query.number));
    if (!id.success)
      return Res.status(406).json(ReturnResponse(true, "Confira o valor!"));
    const method = MethodsStock.safeParse(Req.query.method);
    if (!method.success)
      return Res.status(406).json(ReturnResponse(true, "Confira o metodo!"));
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Volte mais tarde, houve um erro...")
    );
  }
}
