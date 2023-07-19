import Elastic from "@elastic/elasticsearch";
import fs from "fs";
import IndexData from "./index.data";
import Dotenv from "dotenv";
Dotenv.config({ path: "./.env" });

class ElasticSearch {
  public readonly Client: Elastic.Client;
  private readonly Debug: boolean = true;

  constructor() {
    this.Client = new Elastic.Client({
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
    this.load();
  }

  private async createIndex(indexName: string, indexSettings: any) {
    try {
      const exists = await this.Client.indices.exists({ index: indexName });
      if (exists) return;

      await this.Client.indices.create({
        index: indexName,
        ...indexSettings,
      });

      return;
    } catch {
      if (this.Debug) {
        console.log("Houve um erro ao tentar criar uma index!");
      }
      return;
    }
  }
  public load() {
    IndexData.forEach(async (item) => {
      await this.createIndex(item.name, item.settings);
    });
  }
}

export default new ElasticSearch();
