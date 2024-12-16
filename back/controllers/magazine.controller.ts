import { NextFunction, Response, Request } from "express";
import { Magazine } from "../models/magazine/magazine.model";
import { ItemController } from "./item.controller";
import Log from "../config/log.config";

const magazineControler = new ItemController(Magazine);

const logger = new Log().getLogger();

export class MagazineControler {
  static getAll = magazineControler.getAll.bind(magazineControler);
  static getOne = magazineControler.getOne.bind(magazineControler);
  static create = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("MagazineControler.create");
    // load the default value for the tracking code
    req.body.itemType = "magazine";
    magazineControler.create.bind(magazineControler)(req, res, next);
  };
  static update = magazineControler.update.bind(magazineControler);
  static delete = magazineControler.delete.bind(magazineControler);
  static findBy = magazineControler.findBy.bind(magazineControler);
}