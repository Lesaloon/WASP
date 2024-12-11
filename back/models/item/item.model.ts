import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database";

export class Item extends Model {}

export const itemAttributes = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateAcquired: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  condition: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "New",
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "In Use",
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  warranty: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  trackingCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
};

Item.init(itemAttributes, {
  sequelize,
  modelName: "Item",
});