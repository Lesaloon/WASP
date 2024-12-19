import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database";
import { Accessory, accessoryAttributes } from "../accessory/accessory.model";

export class Magazine extends Accessory {}

export const magazineAttributes = {
  ...accessoryAttributes,
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
	type: DataTypes.INTEGER,
	allowNull: false,
  },
  caliberGauge: {
	type: DataTypes.STRING,
	allowNull: false,
  }
};

Magazine.init(magazineAttributes, {
  sequelize,
  modelName: "Magazine",
});