import { Magazine } from "../models/magazine/magazine.model";
import { ItemController } from "./item.controller";

const magazineControler = new ItemController(Magazine);

export class MagazineControler {
  static getAll = magazineControler.getAll.bind(magazineControler);
  static getOne = magazineControler.getOne.bind(magazineControler);
  static create = magazineControler.create.bind(magazineControler);
  static update = magazineControler.update.bind(magazineControler);
  static delete = magazineControler.delete.bind(magazineControler);
  static findBy = magazineControler.findBy.bind(magazineControler);
}