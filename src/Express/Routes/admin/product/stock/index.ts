import express from "express";
import Product from "../../../../../Database/models/product";
import { ID, Numerico } from "../../../../../Schemas/id";
import { MethodsStock } from "../../../../../Schemas/methodsstock";
import ReturnResponse from "../../../../Response";
import BreakDownStock from "../../../../../Database/MongoDB/collections/breakdown";
import { productFace } from "../../../../../types/product.options";
import { decodedData } from "../../../../../types/decodedData.options";
import jwtDecode from "jwt-decode";
import NormalStock from "../../../../../Database/MongoDB/collections/sumStock";
import DelStock from "../../../../../Database/MongoDB/collections/removestock";

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
