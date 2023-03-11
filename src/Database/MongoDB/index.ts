import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const ConexaoMongo = mongoose
  .connect(
    "mongodb://" + process.env.MONGO_HOST + "/" + process.env.MONGO_DBNAME
  )
  .then(() => {
    console.log("Connection 2.0 on...");
  })
  .catch((err) => {
    console.log("Connection 2.0 off...");
  });

export default ConexaoMongo;
