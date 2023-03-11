import express from "express";
import NewClient from "./newclient";

class Financial {
  Router: express.Router;
  constructor(router: express.Router) {
    this.Router = router;
    this.init();
  }
  private init(): void {
    this.Router.post("/client", NewClient);
  }
}

export default new Financial(express.Router()).Router;
