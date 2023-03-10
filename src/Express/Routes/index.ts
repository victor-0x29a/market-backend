import Express from "express";
import authentication from "./authentication";

class Routes {
  router: Express.Router;
  constructor(router: Express.Router) {
    this.router = router;
    this.init();
  }
  private init(): void {
    this.router.use("/auth", authentication);
  }
}

export default new Routes(Express.Router()).router;
