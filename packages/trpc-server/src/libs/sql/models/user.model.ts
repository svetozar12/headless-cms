// import { DataTypes, Model } from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sql";

export interface UserAtributes {
  id?: number;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserInput extends Optional<UserAtributes, "createdAt"> {}

const User = sequelize.define<Model<UserAtributes, UserInput>>("User", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
