import express from "express";
import ProductNewRamAdmin from "./new";
import ProductEditRamAdmin from "./edit";
import ProductStockRamAdmin from "./stock";
import ProductGet from "./get";
import ProductGetAll from "./getAll";

class ProductRamAdmin {
  Router: express.Router;
  constructor(router: express.Router) {
    this.Router = router;
    this.init();
  }
  private init(): void {
    this.Router.post("/", ProductNewRamAdmin);
    this.Router.put("/", ProductEditRamAdmin);
    this.Router.patch("/stock", ProductStockRamAdmin);
    this.Router.get("/unique", ProductGet);
    this.Router.get("/", ProductGetAll);
  }
}

export default new ProductRamAdmin(express.Router()).Router;
