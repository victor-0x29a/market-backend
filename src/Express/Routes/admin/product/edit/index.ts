import express from "express";
import Product from "../../../../../Database/models/product";
import ReturnResponse from "../../../../Response";
import { EditProductSchema } from "../../../../../Schemas/editproduct";
import Supplier from "../../../../../Database/models/supplier";
import supplierFace from "../../../../../types/supplier.options";
import { productFace } from "../../../../../types/product.options";

export default async function ProductEditRamAdmin(
  Req: express.Request,
  Res: express.Response
) {
  try {
    const Body = EditProductSchema.safeParse(Req.body);
    if (!Body.success)
      return Res.status(406).json(
        ReturnResponse(
          true,
          `Confira o campo '${Body.error.errors[0].path[0]}'`
        )
      );

    let byID: productFace | null = await Product.findOne({
      where: { id: Number(Req.body.id) },
    });
    if (!byID)
      return Res.status(409).json(ReturnResponse(true, "Confira o ID!"));

    let supplier: supplierFace | null = await Supplier.findOne({
      where: { id: Number(Req.body.enterprise) },
    });
    if (!supplier)
      return Res.status(406).json(
        ReturnResponse(
          true,
          "Confira a empresa selecionada, pois nao foi encontrada."
        )
      );
    await Product.update(
      {
        name: Req.body.name,
        price: Req.body.price,
        enterprise: Req.body.enterprise,
        replacement: Req.body.replacement,
      },
      {
        where: {
          id: Number(Req.body.id),
        },
      }
    )
      .then(() => {
        return Res.status(204).json();
      })
      .catch((err) => {
        return Res.status(503).json(
          ReturnResponse(true, "Tente novamente mais tarde...")
        );
      });
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Volte mais tarde, houve um erro interno!")
    );
  }
}
