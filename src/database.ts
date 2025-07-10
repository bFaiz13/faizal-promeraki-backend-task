import "reflect-metadata";
import { DataSource } from "typeorm";
import { Part } from "./models/part.entity";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.DB_URL, // MongoDB connection URI
  database: process.env.DB_NAME, // optional if DB name is in URL
  synchronize: true,
  logging: false,
  entities: [Part],
});
