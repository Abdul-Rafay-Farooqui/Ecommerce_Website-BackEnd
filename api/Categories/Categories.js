import { DataTypes, Sequelize } from "sequelize";
import { db } from "../../config/db.js";

const Category = db.define("category", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      }
});

export {Category};