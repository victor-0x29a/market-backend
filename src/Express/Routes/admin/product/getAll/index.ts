import express from "express";
import ReturnResponse from "../../../../Response";
import ProductController from "../../../../../Controllers/Admin/product";

export default async function ProductGetAll(
  Req: express.Request,
  Res: express.Response
) {
  try {
    const From = Number(Req.query!.from);

    const Service = await ProductController.GetAll(From);
    return Res.status(Service.statusCode).json(
      ReturnResponse(Service.error, Service.message, Service.data)
    );
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Tente novamente mais tarde.")
    );
  }
}
