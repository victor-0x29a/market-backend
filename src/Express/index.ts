import express from "express";
import Routes from "./Routes";
import bodyParser from "body-parser";
import cors from "cors";

class Server {
  app: express.Application;
  constructor(app: express.Application) {
    this.app = app;
    this.Middlewares();
    this.Rotas();
  }
  private Rotas(): void {
    this.app.use(Routes);
  }
  private Middlewares(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cors({ origin: true }));
  }
}

export default new Server(express()).app;
