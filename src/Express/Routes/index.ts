import Express from "express";
import authentication from "./authentication";
import operator from "./operator";
import admin from "./admin";
import financial from "./financial";
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
    this.router.use("/admin", WebToken.blockForHigher, admin);
    this.router.use("/financial", financial);
  }
}

export default new Routes(Express.Router()).router;
