import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });


const ConexaoMongo = mongoose
  .connect(
    "mongodb://" + process.env.MONGO_HOST + ":27017/" + process.env.MONGO_DBNAME
  ).then(async () => {
    console.log("Mongo on...")
  }).catch(() => {
    console.log("Mongo off...")
  })


export default ConexaoMongo;
