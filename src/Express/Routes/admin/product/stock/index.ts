import express from "express";
import ReturnResponse from "../../../../Response";
import { decodedData } from "../../../../../types/decodedData.options";
import jwtDecode from "jwt-decode";

import ProductController from "../../../../../Controllers/Admin/product";

export default async function ProductStockRamAdmin(
  Req: express.Request,
  Res: express.Response
) {
  try {
    const header = Req.headers["authorization"];
    const usuario: decodedData = jwtDecode(header!);

    const Service = await ProductController.UpdateStock(
      Req.query.method!.toString(),
      Req.query!.id!.toString(),
      Number(Req.query.value),
      usuario
    );
    return Res.status(Service.statusCode).json(
      ReturnResponse(Service.error, Service.message)
    );
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Volte mais tarde, houve um erro...")
    );
  }
}
