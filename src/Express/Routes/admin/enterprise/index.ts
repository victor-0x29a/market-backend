import express from "express";

class EnterpriseRamAdmin {
  Router: express.Router;
  constructor(router: express.Router) {
    this.Router = router;
  }
  private init(): void {}
}

export default new EnterpriseRamAdmin(express.Router()).Router;
