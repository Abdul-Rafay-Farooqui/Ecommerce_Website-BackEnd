import { Sequelize, DataTypes, FLOAT } from "sequelize";
import { db } from "../../config/db.js";
import { Category } from "../Categories/Categories.js";

const Product = db.define("product" , {

    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      image: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT(),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(),
        allowNull:false,
      }

});

Category.hasMany(Product, {
    foreignKey: "category_id",
  });
  Product.belongsTo(Category, {
    foreignKey: "category_id",
  });

export {Product};