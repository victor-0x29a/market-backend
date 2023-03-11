import ConexaoMongo from "./Database/MongoDB";
import Express from "./Express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

ConexaoMongo.then(() => {
  Express.listen(process.env.WEB_PORT, () => {
    console.log("WebService " + process.env.WEB_PORT);
  });
})
  .catch((err) => {
    console.log("Houve um erro fatal.");
  })
  .finally(() => {
    console.log("Houve um erro fatal.");
  });
