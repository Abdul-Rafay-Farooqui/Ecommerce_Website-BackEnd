import express from "express";
import { isAuth, admin } from "../../middlewares/authMiddlewares.js";
import {
  updateProductById,
  deleteProductById,
  getProduct,
  createProduct,
  getProductById,
  getProductByCategoryId,
} from "./controller.js";

  const router = express.Router();
  router.get("/", getProduct);
  router.get("/:id", getProductById);
  router.get("/category/:id", getProductByCategoryId);
  router.post("/",isAuth,admin , createProduct);
  router.put("/:id",isAuth,admin, updateProductById);
  router.delete("/:id",isAuth, admin, deleteProductById);
  
  export default router;