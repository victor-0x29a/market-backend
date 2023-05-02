import express from "express";
import ReturnResponse from "../../../../Response";
import { decodedData } from "../../../../../types/decodedData.options";
import jwtDecode from "jwt-decode";


import ProductController from '../../../../../Controllers/Admin/product'

export default async function ProductStockRamAdmin(
  Req: express.Request,
  Res: express.Response
) {
  try {

    const header = Req.headers["authorization"]
    const usuario: decodedData = jwtDecode(header!)

    await ProductController.stock(Req.query.method!.toString(), Number(Req.query.id), Number(Req.query.value), usuario).then((data) => {
      return Res.status(data.statusCode).json(ReturnResponse(data.error, data.message))
    }).catch((err) => {
      return Res.status(err.statusCode).json(ReturnResponse(err.error, err.message))
    })

  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Volte mais tarde, houve um erro...")
    );
  }
}
