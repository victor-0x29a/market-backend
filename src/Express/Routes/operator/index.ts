import express from "express";
import ConsultBarChar from "./consultBarChar";

class Operator {
  Router: express.Router;
  constructor(router: express.Router) {
    this.Router = router;
    this.init();
  }
  private init(): void {
    this.Router.get("/product", ConsultBarChar);
  }
}

export default new Operator(express.Router()).Router;
