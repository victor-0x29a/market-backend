import Express from "./Express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

Express.listen(process.env.WEB_PORT, () => {
  console.log("WebService " + process.env.WEB_PORT);
});
