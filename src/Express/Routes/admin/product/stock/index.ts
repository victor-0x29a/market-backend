import express from "express";
import Product from "../../../../../Database/models/product";
import { ID, Numerico } from "../../../../../Schemas/id";
import { MethodsStock } from "../../../../../Schemas/methodsstock";
import ReturnResponse from "../../../../Response";
import BreakDownStock from "../../../../../Database/MongoDB/collections/breakdown";
import { productFace } from "../../../../../types/product.options";
import { decodedData } from "../../../../../types/decodedData.options";
import jwtDecode from "jwt-decode";

export default async function ProductStockRamAdmin(
  Req: express.Request,
  Res: express.Response
) {
  try {
    const id = ID.safeParse(Number(Req.query.id));
    if (!id.success)
      return Res.status(406).json(ReturnResponse(true, "Confira o ID!"));
    const value = Numerico.safeParse(Number(Req.query.value));
    if (!value.success)
      return Res.status(406).json(ReturnResponse(true, "Confira o valor!"));
    const method = MethodsStock.safeParse(Req.query.method);
    if (!method.success)
      return Res.status(406).json(ReturnResponse(true, "Confira o metodo!"));
    const Produto: productFace | null = await Product.findOne({
      where: {
        id: Number(Req.query.id),
      },
    });
    if (!Produto)
      return Res.status(404).json(
        ReturnResponse(true, "O produto nao foi encontrado, tente novamente!")
      );
    if (Req.query.method === "sub") {
      let estoquePrevioSub: number = Produto.stock! - Number(Req.query.value);
      if (estoquePrevioSub < 0)
        return Res.status(409).json(
          ReturnResponse(
            true,
            "Nao foi possivel atualizar o estoque, pois o valor iria ficar negativo!"
          )
        );
      await Product.update(
        {
          stock: Number(estoquePrevioSub),
        },
        {
          where: {
            id: Number(Req.query.id),
          },
        }
      )
        .then(() => {
          return Res.status(204).json();
        })
        .catch((err) => {
          return Res.status(503).json(
            ReturnResponse(true, "Houve um erro, tente novamente... ")
          );
        });
    } else if (Req.query.method === "add") {
      let estoquePrevioAdd: number = Produto.stock! + Number(Req.query.value);
      await Product.update(
        {
          stock: estoquePrevioAdd,
        },
        {
          where: {
            id: Number(Req.query.id),
          },
        }
      )
        .then(() => {
          return Res.status(204).json();
        })
        .catch((err) => {
          return Res.status(503).json(
            ReturnResponse(true, "Houve um erro, tente novamente... ")
          );
        });
    } else if (Req.query.method === "break") {
      let estoquePrevio: number = Produto.stock! - Number(Req.query.value);
      if (estoquePrevio < 0)
        return Res.status(409).json(
          ReturnResponse(
            true,
            "Nao foi possivel atualizar o estoque, pois o valor iria ficar negativo!"
          )
        );
      let header: string = Req.headers["authorization"]!;
      let user: decodedData = jwtDecode(header);
      let breakDownStock: number | undefined = Produto.breakdownStock;
      let finalValue: number = 0;
      if (!breakDownStock) {
        finalValue = Number(Req.query.value);
      } else {
        finalValue = Number(Req.query.value) + breakDownStock;
      }
      await Product.update(
        {
          stock: estoquePrevio,
          breakdownStock: Number(finalValue),
        },
        {
          where: {
            id: Number(Req.query.id),
          },
        }
      )
        .then(async () => {
          await BreakDownStock.create({
            product: Number(Req.query.id),
            user: user.id,
          })
            .then(() => {
              return Res.status(204).json();
            })
            .catch((err) => {
              return Res.status(200).json(
                ReturnResponse(
                  true,
                  "Houve um erro no final, porem o estoque foi atualizado!"
                )
              );
            });
        })
        .catch((err) => {
          return Res.status(503).json(
            ReturnResponse(true, "Houve um erro, tente novamente... ")
          );
        });
    }
    return Res.status(200).json(
      ReturnResponse(true, {
        Message: "So tem alguns metodos disponiveis...",
        Metodos: ["sub", "add", "break"],
      })
    );
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Volte mais tarde, houve um erro...")
    );
  }
}
