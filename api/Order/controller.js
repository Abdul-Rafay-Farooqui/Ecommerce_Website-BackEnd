import asyncHandler from "express-async-handler";
import {
  create_order,
  delete_order,
  get_order,
  get_order_by_id,
  update_order,
} from "./services.js";
import { Order } from "./Order.js";
import { create_orderItems } from "../OrderItem/services.js";
import { total_price } from "../../models/total.js";

const GetOrder = asyncHandler(async (req, res) => {
  try {
    const order = await get_order();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const GetOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await get_order_by_id(req.params.id);
    res.json(order);
    if (!order) {
      res.status(401).json(NotFound("order"));
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const CreateOrder = asyncHandler(async (req, res) => {
  try {
    const items = (req.body.items);
     const order = await create_order(req.user.id);
     

     items.forEach(i => {
         i.order_id = order.id   
     });

     const total = await total_price(items);
     
     const orderitem = await create_orderItems(items);
    
     const final_order = await update_order({total: total}, order.id);

     res.json({order : final_order[1], orderitem : orderitem})

    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
   
});

const UpdatedOrder = asyncHandler(async (req, res) => {
  try {
    const order = await update_order(req.body, req.params.id);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const DeleteOrder = asyncHandler(async (req, res) => {
  try {
    const order = await delete_order(req.params.id);
    if(order){
      res.json("Order has been deleted");
    }else{
      res.json("Order has not been deleted");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export {
  GetOrder,
  GetOrderById,
  CreateOrder,
  UpdatedOrder,
  DeleteOrder,
};