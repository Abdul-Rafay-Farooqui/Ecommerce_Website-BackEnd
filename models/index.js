import { User } from "../api/User/User.js";
import { db } from "../config/db.js";
import { Category } from "../api/Categories/Categories.js";
import { Product } from "../api/Products/Products.js";
import { Order } from "../api/Order/Order.js";
import { OrderItem } from "../api/OrderItem/OrderItem.js";

const initializeModel = async(req,res)=>{
    try {
        await db.sync({alter: true });
        await User.sync({ alter: true });
        await Category.sync({ alter: true });
        await Product.sync({ alter: true });
        await Order.sync({ alter: true });
        await OrderItem.sync({ alter: true });

        res.json("Database Created Successfully");
        
    } catch (error) {
        res.status(500).json(error);
    }

}
export {initializeModel};