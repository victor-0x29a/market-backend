import express from "express";

import EnterpriseNewRamAdmin from "./new";
import EnterpriseEditRamAdmin from "./edit";

class EnterpriseRamAdmin {
  Router: express.Router;
  constructor(router: express.Router) {
    this.Router = router;
    this.init();
  }
  private init(): void {
    this.Router.post("/", EnterpriseNewRamAdmin);
    this.Router.put("/", EnterpriseEditRamAdmin);
  }
}

export default new EnterpriseRamAdmin(express.Router()).Router;
