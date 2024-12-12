import { DataTypes } from "sequelize";
import { sequelize } from "../../database";
import { Item, itemAttributes } from "../item/item.model";
import { Weapon } from "../weapon/weapon.model";

export class Part extends Item {}

export const partAttributes = {
  ...itemAttributes,
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  compatibleModels: {
    type: DataTypes.TEXT,
  },
  weaponId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Weapon,
      key: "id",
    },
  },
};

Part.init(partAttributes, {
  sequelize,
  modelName: "Part",
});

Part.belongsTo(Weapon, { foreignKey: "weaponId" });
