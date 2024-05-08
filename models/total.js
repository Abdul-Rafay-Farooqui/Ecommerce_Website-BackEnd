import { get_product_by_id } from "../api/Products/services.js";
import {db} from "../config/db.js";

const total_price = async (items) => {
   
    let total = 0;

   const promise = items.map(async (item) => {
    const product = await get_product_by_id(item.product_id);
    total += product.price * item.quantity;
   });

   await Promise.all(promise);

    return total;
    
}

export { total_price };