import Log from "./config/log.config";
const logger = new Log().getLogger();
logger.info("Starting server...");

import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./database";
import weaponRoutes from "./routes/weapon.routes";
import accessoryRoutes from "./routes/accessory.routes";
import errorHandler from "./middleware/errorhandler.middleware";
import responseWrapper from "./middleware/responseWrapper.middleware";
// Import models to ensure they are registered with Sequelize
logger.info("Importing models...");
import { Weapon } from "./models/weapon/weapon.model";
import { Part } from "./models/part/part.model";
import { Accessory } from "./models/accessory/accessory.model";
import { Item } from "./models/item/item.model";

dotenv.config();

logger.info("Creating Express app...");
const app: Express = express();
const port = process.env.PORT || 3000;

logger.info("Adding middleware...");
app.use(cors());
app.use(bodyParser.json());
app.use(errorHandler);
app.use("/api/weapon", weaponRoutes);
app.use("/api/accessory", accessoryRoutes);
app.use(responseWrapper);

logger.info("Connecting to the database...");
sequelize.authenticate()
  .then(() => {
    logger.info("Database connected");
    // Sync all models
	logger.info("Synchronizing models with the database...");
    return sequelize.sync();
  })
  .then(() => {
    logger.info("Models synchronized with the database");
    // Start the server
    app.listen(port, () => {
      logger.info(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    logger.fatal("Database connection failed", err);
  });
