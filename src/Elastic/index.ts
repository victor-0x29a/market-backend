import Elastic from "@elastic/elasticsearch";
import fs from "fs";
import Dotenv from "dotenv";
Dotenv.config({ path: "./.env" });

const client = new Elastic.Client({
  tls: {
    ca: fs.readFileSync(__dirname + "/http_ca.crt"),
    rejectUnauthorized: false,
  }, //docker cp es:/usr/share/elasticsearch/config/certs/http_ca.crt .

  node: process.env.ELASTIC_HOST,
  auth: {
    username: process.env.ELASTIC_USER!,
    password: process.env.ELASTIC_PASSWORD!,
  },
});

export default client;
