import Log from "../config/log.config";
import { Accessory } from "../models/accessory/accessory.model";
import { ItemController } from "./item.controller";
import { Request, Response, NextFunction } from "express";

const accessoryController = new ItemController(Accessory);
const logger = new Log().getLogger();

export class AccessoryController {
  static getAll = accessoryController.getAll.bind(accessoryController);
  static getOne = accessoryController.getOne.bind(accessoryController);
  static create = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("AccessoryController.create");
    // load the default value for the tracking code
    req.body.itemType = "accessory";
    accessoryController.create.bind(accessoryController)(req, res, next);
  };
  static update = accessoryController.update.bind(accessoryController);
  static delete = accessoryController.delete.bind(accessoryController);
  static findBy = accessoryController.findBy.bind(accessoryController);
}
