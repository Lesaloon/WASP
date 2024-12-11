import { DataTypes } from "sequelize";
import { sequelize } from "../../database";
import { Item, itemAttributes } from "../item/item.model";

export class Weapon extends Item {}

export const weaponAttributes = {
  ...itemAttributes, // Include Item attributes
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subcategory: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "NONE",
  },
  caliberGauge: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  barelLength: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  actionType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  countryOfOrigin: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "France",
  },
};

Weapon.init(weaponAttributes, {
  sequelize,
  modelName: "Weapon",
});
