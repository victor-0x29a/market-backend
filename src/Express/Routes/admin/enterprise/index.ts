import express from "express";

import EnterpriseNewRamAdmin from "./new";

class EnterpriseRamAdmin {
  Router: express.Router;
  constructor(router: express.Router) {
    this.Router = router;
    this.init();
  }
  private init(): void {
    this.Router.post("/new", EnterpriseNewRamAdmin);
  }
}

export default new EnterpriseRamAdmin(express.Router()).Router;
