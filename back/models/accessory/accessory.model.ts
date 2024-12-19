import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database";
import { Item, itemAttributes } from "../item/item.model";
import { Weapon } from "../weapon/weapon.model";

export class Accessory extends Item {}

export const accessoryAttributes = {
  ...itemAttributes,
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weaponId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Weapon,
      key: 'id',
    },
  },
};

Accessory.init(accessoryAttributes, {
  sequelize,
  modelName: "Accessory",
});

Accessory.belongsTo(Weapon, { foreignKey: 'weaponId' });

