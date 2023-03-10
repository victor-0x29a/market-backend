import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const sequelize = new Sequelize(
  process.env.MYSQL_DIALECT +
    "://" +
    process.env.MYSQL_USER +
    ":" +
    process.env.MYSQL_PASS +
    "@" +
    process.env.MYSQL_HOST +
    ":" +
    process.env.MYSQL_PORT +
    "/" +
    process.env.MYSQL_DBNAME
);

sequelize
  .authenticate()
  .then((): void => {
    console.log("Connection on...");
  })
  .catch((err): void => {
    console.log("Connection off...");
  });

export default sequelize;
