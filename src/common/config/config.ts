import * as dotenv from "dotenv";
import { IConfig } from "../types/types";

dotenv.config();

export const config: IConfig  = {
    port: Number(process.env.PORT) || 3000,
    database: process.env.DATABASE,
    database_port: Number(process.env.DATABASE_PORT),
    database_host: process.env.DATABASE_HOST,
    database_user: process.env.DATABASE_USER,
    database_password: process.env.DATABASE_PASSWORD,
}