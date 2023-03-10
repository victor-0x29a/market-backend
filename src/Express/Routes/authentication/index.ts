import Express, { Request, Response } from "express";

class Auth {
  router: Express.Router;
  constructor(router: Express.Router) {
    this.router = router;
    this.Routes();
  }
  private Routes(): void {}

  protected async login(req: Request, res: Response) {
    try {
    } catch (e) {}
  }
}

export default new Auth(Express.Router()).router;
