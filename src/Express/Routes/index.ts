import Express from "express";
import authentication from "./authentication";
import operator from "./operator";
import admin from "./admin";
import WebToken from "../../WebToken";

class Routes {
  router: Express.Router;
  constructor(router: Express.Router) {
    this.router = router;
    this.init();
  }
  private init(): void {
    this.router.use("/auth", authentication);
    this.router.use("/operator", WebToken.blockForOperator, operator);
    this.router.use("/admin", WebToken.blockForAdministrator, admin);
  }
}

export default new Routes(Express.Router()).router;
