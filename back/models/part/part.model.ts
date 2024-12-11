import { DataTypes } from "sequelize";
import { sequelize } from "../../database";
import { Item, itemAttributes } from "../item/item.model";
import { Weapon } from "../weapon/weapon.model";

class Part extends Item {}

Part.init({
  ...itemAttributes,
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  compatibleModels: {
    type: DataTypes.ARRAY(DataTypes.STRING),
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
  modelName: "Part",
});

Part.belongsTo(Weapon, { foreignKey: 'weaponId' });

export { Part };
