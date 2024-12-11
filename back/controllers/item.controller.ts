import { Request, Response } from "express";
import { Model, ModelStatic } from "sequelize";
import Log from "../config/log.config";
import { ModelController } from "./model.controller";

const logger = new Log().getLogger();

export class ItemController extends ModelController {
  constructor(itemModel: ModelStatic<Model>) {
    super(itemModel);
  }
}
