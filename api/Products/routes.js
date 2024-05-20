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

import multer from "multer";

const uploads = multer({
  storage: multer.memoryStorage(), // Use memory storage for image data
});

const router = express.Router();
router.get("/", getProduct);
router.get("/:id", getProductById);
router.get("/category/:id", getProductByCategoryId);
router.post("/", uploads.single("image"), isAuth, admin, createProduct);
router.put("/:id", isAuth, admin, updateProductById);
router.delete("/:id", isAuth, admin, deleteProductById);

export default router;
