import { NextFunction, Request, Response } from "express";
import { Weapon } from "../models/weapon/weapon.model";
import { ItemController } from "./item.controller";
import Log from "../config/log.config";

const weaponController = new ItemController(Weapon);
const logger = new Log().getLogger();
export class WeaponController {
  static getAll = weaponController.getAll.bind(weaponController);
  static getOne = weaponController.getOne.bind(weaponController);
  static create = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("WeaponController.create");
    // load the default value for the tracking code
    req.body.itemType = "weapon";
    weaponController.create.bind(weaponController)(req, res, next);
  };
  static update = weaponController.update.bind(weaponController);
  static delete = weaponController.delete.bind(weaponController);
  static findBy = weaponController.findBy.bind(weaponController);
}