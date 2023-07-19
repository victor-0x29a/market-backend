import express from "express";
import ReturnResponse from "../../../../Response";
import ProductController from "../../../../../Controllers/Admin/product";

export default async function ProductEditRamAdmin(
  Req: express.Request,
  Res: express.Response
) {
  try {
    await ProductController.Update(Req.body)
      .then((data) => {
        return Res.status(data.statusCode).json(
          ReturnResponse(data.error, data.message)
        );
      })
      .catch((err) => {
        return Res.status(err.statusCode).json(
          ReturnResponse(err.error, err.message)
        );
      });
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Volte mais tarde, houve um erro interno!")
    );
  }
}
