import express from "express";
import { isAuth, admin } from "../../middlewares/authMiddlewares.js";
import {
  updateCategoryById,
  deleteCategoryById,
  getCategories,
  createCategory,
  getCategoryById,
} from "./controller.js";

  const router = express.Router();
  router.get("/", getCategories);
  router.get("/:id", getCategoryById);
  router.post("/",isAuth,admin , createCategory);
  router.put("/:id",isAuth,admin, updateCategoryById);
  router.delete("/:id",isAuth, admin, deleteCategoryById);
  
  export default router;