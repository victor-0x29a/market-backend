import express from "express";
import { BARCHAR } from "../../../../Schemas/barchar";
import ReturnResponse from "../../../Response";
import product from "../../../../Database/models/product";
import Supplier from "../../../../Database/models/supplier";

export default async function ConsultBarChar(
  Req: express.Request,
  Res: express.Response
) {
  try {
    const Entry = BARCHAR.safeParse(Req.query.barchar);
    if (!Entry.success)
      return Res.status(406).json(
        ReturnResponse(true, "Confira seu codigo de barras!")
      );
    let produto = await product.findOne({
      where: { barchar: Req.query.barchar!.toString() },
      include: [{ attributes: ["name"], model: Supplier }],
    });
    if (!produto)
      return Res.status(404).json(
        ReturnResponse(true, "Produto nao encontrado!")
      );
    return Res.status(200).json(
      ReturnResponse(false, {
        Name: produto.name,
        Price: produto.price,
        Enterprise: produto.supplier?.name,
      })
    );
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Tente novamente mais tarde!")
    );
  }
}
