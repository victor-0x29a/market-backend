import express from "express";
import ProductNewRamAdmin from "./new";
import ProductEditRamAdmin from "./edit";

class ProductRamAdmin {
  Router: express.Router;
  constructor(router: express.Router) {
    this.Router = router;
    this.init();
  }
  private init(): void {
    this.Router.post("/", ProductNewRamAdmin);
    this.Router.put("/", ProductEditRamAdmin);
  }
}

export default new ProductRamAdmin(express.Router()).Router;
