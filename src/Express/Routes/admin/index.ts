import express from "express";
import ProductRamAdmin from "./product";
import EnterpriseRamAdmin from "./enterprise";
import WebToken from "../../../WebToken";

class Admin {
  Router: express.Router;
  constructor(router: express.Router) {
    this.Router = router;
    this.init();
  }
  private init(): void {
    this.Router.use("/product", WebToken.blockForHigher, ProductRamAdmin);
    this.Router.use("/enterprise", WebToken.blockForHigher, EnterpriseRamAdmin);
  }
}

export default new Admin(express.Router()).Router;
