import Log from "../config/log.config";
import { Part } from "../models/part/part.model";
import { ItemController } from "./item.controller";
import { Request, Response, NextFunction } from "express";

const partController = new ItemController(Part);
const logger = new Log().getLogger();

export class PartController {
  static getAll = partController.getAll.bind(partController);
  static getOne = partController.getOne.bind(partController);
  static create = async (req: Request, res: Response, next: NextFunction) => {
	logger.info("PartController.create");
	// load the default value for the tracking code
	req.body.itemType = "part";
	partController.create.bind(partController)(req, res, next);
  };
  static update = partController.update.bind(partController);
  static delete = partController.delete.bind(partController);
  static findBy = partController.findBy.bind(partController);
}