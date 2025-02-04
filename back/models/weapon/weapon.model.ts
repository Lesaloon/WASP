import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database";
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
  legalCategory: {
	type: DataTypes.STRING,
	allowNull: false,
	// from an enum
	values: ["A1", "A2", "B", "C", "D"]
  },
  // when a weapon is registered the authorizations is only valid for 5 years (from the date of registration)
  SIAExpireDate: {
	type: DataTypes.DATE,
	allowNull: true
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
    type: DataTypes.STRING,
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
