import express from "express";

import EnterpriseNewRamAdmin from "./new";
import EnterpriseEditRamAdmin from "./edit";
import EnterpriseGetAdmin from "./get";
import EnterpriseGetAllAdmin from "./getall";

class EnterpriseRamAdmin {
  Router: express.Router;
  constructor(router: express.Router) {
    this.Router = router;
    this.init();
  }
  private init(): void {
    this.Router.post("/", EnterpriseNewRamAdmin);
    this.Router.put("/", EnterpriseEditRamAdmin);
    this.Router.get("/", EnterpriseGetAdmin);
    this.Router.get("/all", EnterpriseGetAllAdmin);
  }
}

export default new EnterpriseRamAdmin(express.Router()).Router;
