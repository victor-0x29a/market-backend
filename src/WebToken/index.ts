import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

class Token {
  private secret: string;
  constructor(secret: string) {
    this.secret = secret;
  }
  public generate(id: number): string | boolean {
    if (!id) return false;
    let jwt = jsonwebtoken.sign({ id: id }, this.secret);
    return jwt;
  }
}
