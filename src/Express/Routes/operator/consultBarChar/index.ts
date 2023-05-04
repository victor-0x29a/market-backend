import express from "express";
import { BARCHAR } from "../../../../Schemas/barchar";
import ReturnResponse from "../../../Response";
import product from "../../../../Database/models/product";
import Supplier from "../../../../Database/models/supplier";

import ProductController from '../../../../Controllers/Admin/product'

export default async function ConsultBarChar(
  Req: express.Request,
  Res: express.Response
) {
  try {
    // nome - preco - empresa
    await ProductController.get("barchar", Number(Req.query.barchar)).then((data) => {
      if (!data.error) {
        return Res.status(data.statusCode).json(ReturnResponse(data.error, {
          name: data.message.name!,
          price: data.message.price!,
          enterprise: data.message.supplier!.name
        }))
      }
      return Res.status(data.statusCode).json(ReturnResponse(data.error, data.message))
    }).catch((err) => {
      return Res.status(err.statusCode).json(ReturnResponse(err.error, err.message))
    })
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Tente novamente mais tarde!")
    );
  }
}
