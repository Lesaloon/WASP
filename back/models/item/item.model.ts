import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database";
import { generateTrackingNumber } from "../../helpers/tracking.helper";
import { Status } from "./status.enum";
import { Condition } from "./condition.enum";

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
  link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dateAcquired: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  priceBought: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  condition: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "new",
	values: Object.values(Condition),
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "in_use",
    values: Object.values(Status),
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
