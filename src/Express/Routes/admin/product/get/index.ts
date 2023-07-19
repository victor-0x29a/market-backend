import express from "express";
import ReturnResponse from "../../../../Response";
import ProductController from "../../../../../Controllers/Admin/product";

export default async function ProductGet(
  Req: express.Request,
  Res: express.Response
) {
  try {
    const method = Req.query!.method!.toString();
    const data = Req.query!.data!.toString();

    const Service = await ProductController.Get(method, data);
    return Res.status(Service.statusCode).json(
      ReturnResponse(Service.error, Service.message, Service.data)
    );
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Tente novamente mais tarde.")
    );
  }
}
