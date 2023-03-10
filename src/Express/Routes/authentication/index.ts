import Express, { Request, Response } from "express";
import ReturnResponse from "../../Response";

import register from "./register";
import login from "./login";

class Auth {
  router: Express.Router;
  constructor(router: Express.Router) {
    this.router = router;
    this.Routes();
  }
  private Routes(): void {
    this.router.post("/register", register);
    this.router.post("/login", login);
  }
}

export default new Auth(Express.Router()).router;
