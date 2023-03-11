import express from "express";
import AccountEditRamAdmin from "./edit";

class AccountRamAdmin {
  Router: express.Router;
  constructor(router: express.Router) {
    this.Router = router;
    this.init();
  }
  private init(): void {
    this.Router.put("/", AccountEditRamAdmin);
  }
}

export default new AccountRamAdmin(express.Router()).Router;
