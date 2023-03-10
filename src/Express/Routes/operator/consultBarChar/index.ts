import express from "express";
import { ID } from "../../../../Schemas/id";
import ReturnResponse from "../../../Response";
import product from "../../../../Database/models/product";
import Supplier from "../../../../Database/models/supplier";

interface consult {
  id?: number;
  barchar: string;
  name: string;
  stock: number;
  breakdownStock: number;
  replacement: boolean;
  enterprise: number;
  price: number;
}

export default async function ConsultBarChar(
  Req: express.Request,
  Res: express.Response
) {
  try {
    const Entry = ID.safeParse(Number(Req.query.id));
    if (!Entry.success)
      return Res.status(406).json(ReturnResponse(true, "Confira seu ID"));
    let produto: consult | null = await product.findOne({
      where: { id: Number(Req.query.id) },
      include: [{ attributes: ["name"], model: Supplier }],
    });
    if (!produto)
      return Res.status(404).json(
        ReturnResponse(true, "Produto nao encontrado!")
      );
    return Res.status(200).json(
      ReturnResponse(false, { Name: produto.name, Price: produto.price })
    );
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Tente novamente mais tarde!")
    );
  }
}
