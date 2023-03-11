import express from "express";
import ProductNewRamAdmin from "./new";

class ProductRamAdmin {
  Router: express.Router;
  constructor(router: express.Router) {
    this.Router = router;
    this.init();
  }
  private init(): void {
    this.Router.post("/new", ProductNewRamAdmin);
  }
}

export default new ProductRamAdmin(express.Router()).Router;
