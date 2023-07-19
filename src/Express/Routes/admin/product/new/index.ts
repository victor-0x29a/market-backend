import express from "express";
import ReturnResponse from "../../../../Response";
import ProductController from "../../../../../Controllers/Admin/product";

export default async function ProductNewRamAdmin(
  Req: express.Request,
  Res: express.Response
) {
  try {
    const Service = await ProductController.Create(Req.body);
    return Res.status(Service.statusCode).json(
      ReturnResponse(Service.error, Service.message)
    );
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Tente novamente mais tarde.")
    );
  }
}
