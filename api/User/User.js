import { Sequelize, DataTypes } from "sequelize";
import { db } from "../../config/db.js";


const User = db.define("users", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(255),
    allowNull: false      
  },
  email: {
    type: DataTypes.STRING(320),
    allowNull: false,
    unique: "email",
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM("Male", "Female", "Other"),
    allowNull: false,
  },
  account_type: {
    type: DataTypes.ENUM("admin", "user"),
    allowNull: false,
    defaultValue: "user",
  }
});


export { User };
