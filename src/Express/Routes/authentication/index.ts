import Express, { Request, Response } from "express";

import register from "./register";
import login from "./login";
import WebToken from "../../../WebToken";

class Auth {
  router: Express.Router;
  constructor(router: Express.Router) {
    this.router = router;
    this.Routes();
  }
  private Routes(): void {
    this.router.post("/register", WebToken.blockForHigher, register);
    this.router.post("/login", login);
  }
}

export default new Auth(Express.Router()).router;
