import express from "express";

class ProductRamAdmin {
  Router: express.Router;
  constructor(router: express.Router) {
    this.Router = router;
  }
  private init(): void {}
}

export default new ProductRamAdmin(express.Router()).Router;
