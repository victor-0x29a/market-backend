import Express from "express";
import authentication from "./authentication";
import operator from "./operator";
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
  }
}

export default new Routes(Express.Router()).router;
