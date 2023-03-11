import express from "express";
import ReturnResponse from "../../../../Response";
import { ProductNewSchema } from "../../../../../Schemas/product";
import Product from "../../../../../Database/models/product";
import { productFace } from "../../../../../types/product.options";
import supplierFace from "../../../../../types/supplier.options";
import Supplier from "../../../../../Database/models/supplier";

export default async function ProductNewRamAdmin(
  Req: express.Request,
  Res: express.Response
) {
  try {
    const Body = ProductNewSchema.safeParse(Req.body);
    if (!Body.success)
      return Res.status(406).json(
        ReturnResponse(
          true,
          `Confira o campo '${Body.error.errors[0].path[0]}'`
        )
      );
    let byBarchar: productFace | null = await Product.findOne({
      where: { barchar: Req.body.barchar },
    });
    if (byBarchar)
      return Res.status(409).json(ReturnResponse(true, "Confira o barchar!"));

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

    await Product.create({
      name: Req.body.name,
      barchar: Req.body.barchar,
      stock: Req.body.stock ? Req.body.stock : 0,
      replacement: Req.body.replacement,
      enterprise: Req.body.enterprise,
      price: Req.body.price,
    })
      .then(() => {
        return Res.status(201).json(
          ReturnResponse(false, {
            Message: `Produto '${Req.body.name}' criado.`,
          })
        );
      })
      .catch((err) => {
        return Res.status(503).json(
          ReturnResponse(
            true,
            "Tente novamente mais tarde, pois houve um erro interno!"
          )
        );
      });
  } catch (e) {
    console.log(e);
    return Res.status(503).json(
      ReturnResponse(true, "Tente novamente mais tarde.")
    );
  }
}
