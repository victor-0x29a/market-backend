import Express from "./Express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

Express.listen(process.env.WEB_PORT, () => {
  console.log("HTTP server on - " + process.env.WEB_PORT);
});
