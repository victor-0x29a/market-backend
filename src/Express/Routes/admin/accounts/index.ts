import express from "express";
import AccountNewRamAdmin from "./new";
import AccountEditRamAdmin from "./edit";
import WebToken from "../../../../WebToken";

class AccountRamAdmin {
  Router: express.Router;
  constructor(router: express.Router) {
    this.Router = router;
    this.init();
  }
  private init(): void {
    this.Router.put("/", WebToken.blockForAdmin, AccountEditRamAdmin);
    this.Router.post("/", WebToken.blockForAdmin, AccountNewRamAdmin);
  }
}

export default new AccountRamAdmin(express.Router()).Router;
