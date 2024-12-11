import Log from "./config/log.config";
const logger = new Log().getLogger();
logger.info("Starting server...");
import { Express } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
logger.info("Importing routes and middleware...");
import weaponRoutes from "./routes/weapon.routes";
import errorHandler from "./middleware/errorhandler.middleware";
import responseWrapper from "./middleware/responseWrapper.middleware";
dotenv.config();

logger.info("Creating Express app...");
const app: Express = require("express")();
const port = process.env.PORT || 3000;

logger.info("Adding middleware...");
app.use(cors());
app.use(bodyParser.json());
app.use(errorHandler);
app.use("/api/weapon", weaponRoutes);
app.use(responseWrapper);

logger.info("Connecting to MongoDB...");
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/WASP";

mongoose
  .connect(mongoUrl, {})
  .then(() => {
    logger.info("MongoDB connected");
    logger.info("Starting Express server...");
    app.listen(port, () => {
      logger.info(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    logger.fatal("MongoDB connection failed");
  });
