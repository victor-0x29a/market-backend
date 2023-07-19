import express from "express";

class Operator {
  Router: express.Router;
  constructor(router: express.Router) {
    this.Router = router;
    this.init();
  }
  private init(): void {}
}

export default new Operator(express.Router()).Router;
