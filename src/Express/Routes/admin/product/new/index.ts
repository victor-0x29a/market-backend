import express from "express";
import ReturnResponse from "../../../../Response";
export default async function (Req: express.Request, Res: express.Response) {
  try {
    /*
      id?: number;
  barchar: string;
  name: string;
  stock: number;
  breakdownStock: number;
  replacement: boolean;
  enterprise: number;
  price: number;
    */
  } catch (e) {
    return Res.status(503).json(
      ReturnResponse(true, "Tente novamente mais tarde.")
    );
  }
}
