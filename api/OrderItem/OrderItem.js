import {db} from "../../config/db.js"
import { Sequelize,  DataTypes } from "sequelize";
import { Product } from "../Products/Products.js";
import { Order } from "../Order/Order.js";

const OrderItem = db.define("order_item",
{
    id: {

        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,

    },

    quantity : {
        type : DataTypes.INTEGER,
        defaultValue: 1
    }


}
);

Product.hasOne(OrderItem, {
    foreignKey:"product_id",
    allowNull : false
});
OrderItem.belongsTo(Product,{
    foreignKey: "product_id",
    allowNull:false
});

Order.hasMany(OrderItem, {
    foreignKey:"order_id",
    allowNull : false
});
OrderItem.belongsTo(Order,{
    foreignKey: "order_id",
    allowNull:false
})
export { OrderItem}