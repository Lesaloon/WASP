import { NextFunction, Request, Response } from "express";
import { Model, ModelStatic } from "sequelize";
import Log from "../config/log.config";
import { ModelController } from "./model.controller";
import { generateTrackingNumber } from "../helpers/tracking.helper";

const logger = new Log().getLogger();

export class ItemController extends ModelController {
  constructor(itemModel: ModelStatic<Model>) {
    super(itemModel);
  }

  async create(req: Request, res: Response, next: NextFunction) {
	// load the default value for the tracking code
	req.body.trackingCode = await generateTrackingNumber(req.body.itemType);
	super.create(req, res, next);
  }
}
