import { User } from "@/entities/User";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true, 
  logging: true,
  entities: [User],
migrations: [],
});
