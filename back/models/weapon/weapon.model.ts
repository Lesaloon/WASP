import { DataTypes } from "sequelize";
import { sequelize } from "../../database";
import { Item, itemAttributes } from "../item/item.model";

class Weapon extends Item {}

Weapon.init({
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
  actionType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  countryOfOrigin: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "France",
  },
}, {
  sequelize,
  modelName: "Weapon",
});

export { Weapon };
