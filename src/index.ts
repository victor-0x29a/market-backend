import ConexaoMongo from "./Database/MongoDB";
import Express from "./Express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

ConexaoMongo;
Express.listen(process.env.WEB_PORT, () => {
  console.log("HTTP server on - " + process.env.WEB_PORT);
});
