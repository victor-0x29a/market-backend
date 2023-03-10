import Express from "express";

class Routes {
  router: Express.Router;
  constructor(router: Express.Router) {
    this.router = router;
    this.init();
  }
  private init(): void {}
}

export default new Routes(Express.Router()).router;
