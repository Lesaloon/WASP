import { Dialect, Sequelize } from "sequelize";
import Log from "./log.config";
const logger = new Log().getLogger();

import EnvConfig from "./env.config";
import { assert } from "console";

const envConfig = EnvConfig.getInstance();

// const username = envConfig.get('DB_USERNAME') || 'admin';
// const password = envConfig.get('DB_PASSWORD') || '';
// const database = envConfig.get('DB_NAME') || 'postgres';
// const host = envConfig.get('DB_HOST') || 'localhost';
// const port = Number(envConfig.get('DB_PORT')) || 5432;
let database_url: string;
if (process.env.DATABASE_PASSWORD_FILE) {
	logger.info("Reading database password from file");
	const fs = require('fs');
	const password = fs.readFileSync(process.env.DATABASE_PASSWORD_FILE, 'utf8').trim();
	process.env.DATABASE_PASSWORD = password;
	logger.info("Database password read from file");
	database_url = "postgres://postgres:" + password + "@db:5432/postgres";
	logger.info("Database URL: " + database_url);
} else {
	logger.info("Reading database password from environment variable");
	database_url = (process.env.DATABASE_URL || envConfig.get('DB_POOL_MIN')) ??'';
	if (database_url === '') {
	  assert(false, "DATABASE_URL is undefined");
	}
}
const dialect = 'postgres';

// const sequelize = new Sequelize(database, username, password, {
//   host,
//   port,
//   dialect,
//   logging: process.env.DB_LOGGING === 'true' ? console.log : false, // Conditional logging
//   pool: {
//     max: Number(envConfig.get('DB_POOL_MAX')) || 5,
//     min: Number(envConfig.get('DB_POOL_MIN')) || 0,
//     acquire: Number(envConfig.get('DB_POOL_ACQUIRE')) || 30000,
//     idle: Number(envConfig.get('DB_POOL_IDLE')) || 10000,
//   },
// });

const sequelize = new Sequelize(database_url as string, {});

export { sequelize };

