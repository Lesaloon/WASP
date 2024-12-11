import { Weapon } from "../models/weapon/weapon.model";
import { ItemController } from "./item.controller";

const weaponController = new ItemController(Weapon);

export class WeaponController {
  static getAll = weaponController.getAll.bind(weaponController);
  static getOne = weaponController.getOne.bind(weaponController);
  static create = weaponController.create.bind(weaponController);
  static update = weaponController.update.bind(weaponController);
  static delete = weaponController.delete.bind(weaponController);
  static findBy = weaponController.findBy.bind(weaponController);
}