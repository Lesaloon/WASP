import { DataTypes } from "sequelize";
import { sequelize } from "../../database";
import { Item, itemAttributes } from "../item/item.model";
import { Weapon } from "../weapon/weapon.model";

class Accessory extends Item {}

Accessory.init({
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
}, {
  sequelize,
  modelName: "Accessory",
});

Accessory.belongsTo(Weapon, { foreignKey: 'weaponId' });

export { Accessory };
