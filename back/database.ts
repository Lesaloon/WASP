import dotenv from "dotenv";
import { Dialect, Sequelize } from "sequelize";
dotenv.config();

const database = process.env.SQL_DATABASE_NAME || "database";
const username = process.env.SQL_DATABASE_USER || "username";
const password = process.env.SQL_DATABASE_PASSWORD || "password";
const host = process.env.SQL_DATABASE_HOST || "localhost";
const dialect = (process.env.SQL_DATABASE_DIALECT as Dialect) || "mysql";

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  //logging: console.log, // Enable logging
});

export { sequelize };
