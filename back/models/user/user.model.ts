import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database";
import bcrypt from "bcryptjs";

export class User extends Model {}

export const userAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    // hash the password before saving it to the database
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // we have a RBAC system in place, so we need to know the roles

  // arrays are specific to Postgres, so we need to use a string and parse it
  role: {
  	type: DataTypes.ARRAY(DataTypes.STRING),
  	allowNull: false,
  	defaultValue: ["user"],
  },

};

export interface IUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

User.init(
  {
    ...userAttributes,
    password: {
      ...userAttributes.password,
      set(value: string) {
        const saltRounds = 10;
        const hash = bcrypt.hashSync(value, saltRounds);
        this.setDataValue("password", hash);
      },
    },
    role: {
      ...userAttributes.role,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);
