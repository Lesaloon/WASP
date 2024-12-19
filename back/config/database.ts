import { Dialect, Sequelize } from "sequelize";
import EnvConfig from "./env.config";

const envConfig = EnvConfig.getInstance();

const username = envConfig.get('DB_USERNAME') || 'admin';
const password = envConfig.get('DB_PASSWORD') || '';
const database = envConfig.get('DB_NAME') || 'postgres';
const host = envConfig.get('DB_HOST') || 'localhost';
const port = Number(envConfig.get('DB_PORT')) || 5432;
const dialect = (envConfig.get('DB_DIALECT') as Dialect) || 'postgres';

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
  logging: process.env.DB_LOGGING === 'true' ? console.log : false, // Conditional logging
  pool: {
    max: Number(envConfig.get('DB_POOL_MAX')) || 5,
    min: Number(envConfig.get('DB_POOL_MIN')) || 0,
    acquire: Number(envConfig.get('DB_POOL_ACQUIRE')) || 30000,
    idle: Number(envConfig.get('DB_POOL_IDLE')) || 10000,
  },
  // Additional options can be added here
});

export { sequelize };
