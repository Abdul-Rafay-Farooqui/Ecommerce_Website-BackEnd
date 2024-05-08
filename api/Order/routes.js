import express from "express";
import { CreateOrder, DeleteOrder, GetOrder, GetOrderById, UpdatedOrder } from "./controller.js";
import { admin } from "../../middlewares/authMiddlewares.js";
import { isAuth } from "../../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/",GetOrder);
router.get("/:id",GetOrderById);
router.post("/",CreateOrder);
router.put("/:id",isAuth,admin,UpdatedOrder);
router.delete("/:id",isAuth,admin,DeleteOrder);
export default router;