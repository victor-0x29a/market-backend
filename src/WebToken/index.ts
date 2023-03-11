import jsonwebtoken from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";
import ReturnResponse from "../Express/Response";
dotenv.config({ path: "./.env" });

class TokenWeb {
  private secret: string;
  constructor(secret: string) {
    this.secret = secret;
  }
  public generate(id: number, role: string): string | boolean {
    if (!id) return false;
    let jwt = jsonwebtoken.sign({ id: id, role: role }, this.secret, {
      expiresIn: "1hr",
    });
    return jwt;
  }
  public blockForOperator(
    Req: express.Request,
    Res: express.Response,
    Next: express.NextFunction
  ) {
    try {
      let token: string | undefined = Req.headers["authorization"];
      if (!token)
        return Res.status(401).json(ReturnResponse(true, "Sem permissao"));
      jsonwebtoken.verify(token, process.env.SECRET!, (err) => {
        if (err)
          return Res.status(401).json(
            ReturnResponse(true, "Tente novamente mais tarde!")
          );
        Next();
      });
    } catch (e) {
      return Res.status(503).json(
        ReturnResponse(true, "Tente novamente mais tarde!")
      );
    }
  }
  public blockForHigher(
    Req: express.Request,
    Res: express.Response,
    Next: express.NextFunction
  ) {
    try {
      let token: string | undefined = Req.headers["authorization"];
      if (!token)
        return Res.status(401).json(ReturnResponse(true, "Sem permissao"));
      jsonwebtoken.verify(
        token,
        process.env.SECRET!,
        (err, decoded: object | string | undefined) => {
          if (err)
            return Res.status(401).json(
              ReturnResponse(true, "Tente novamente mais tarde!")
            );
          let Valores: Array<number | string> = Object.values(decoded!);
          if (Valores[1] !== "administrador" && Valores[1] !== "financeiro")
            return Res.status(401).json(ReturnResponse(true, "Sem permissao"));
          Next();
        }
      );
    } catch (e) {
      return Res.status(503).json(
        ReturnResponse(true, "Tente novamente mais tarde!")
      );
    }
  }
  public blockForAdmin(
    Req: express.Request,
    Res: express.Response,
    Next: express.NextFunction
  ) {
    try {
      let token: string | undefined = Req.headers["authorization"];
      if (!token)
        return Res.status(401).json(ReturnResponse(true, "Sem permissao"));
      jsonwebtoken.verify(
        token,
        process.env.SECRET!,
        (err, decoded: object | string | undefined) => {
          if (err)
            return Res.status(401).json(
              ReturnResponse(true, "Tente novamente mais tarde!")
            );
          let Valores: Array<number | string> = Object.values(decoded!);
          if (Valores[1] !== "administrador")
            return Res.status(401).json(ReturnResponse(true, "Sem permissao"));
          Next();
        }
      );
    } catch (e) {
      return Res.status(503).json(
        ReturnResponse(true, "Tente novamente mais tarde!")
      );
    }
  }
}

export default new TokenWeb(process.env.SECRET!);
