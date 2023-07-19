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

    await ProductController.Get(method, data)
      .then((data) => {
        return Res.status(data.statusCode).json(
          ReturnResponse(data.error, data.message, data.data)
        );
      })
      .catch((err) => {
        return Res.status(err.statusCode).json(
          ReturnResponse(err.error, err.message)
        );
      });
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Tente novamente mais tarde.")
    );
  }
}
