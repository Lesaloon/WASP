import { Accessory } from "../models/accessory/accessory.model";
import { ItemController } from "./item.controller";

const accessoryController = new ItemController(Accessory);

export class AccessoryController {
  static getAll = accessoryController.getAll.bind(accessoryController);
  static getOne = accessoryController.getOne.bind(accessoryController);
  static create = accessoryController.create.bind(accessoryController);
  static update = accessoryController.update.bind(accessoryController);
  static delete = accessoryController.delete.bind(accessoryController);
  static findBy = accessoryController.findBy.bind(accessoryController);
}
