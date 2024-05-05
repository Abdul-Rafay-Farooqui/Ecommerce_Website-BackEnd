import express from "express";
import { isAuth, admin } from "../../middlewares/authMiddlewares.js";
import {
  updateUserById,
  deleteUserById,
} from "./controller.js";

import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(), // Use memory storage for image data
  });

  const router = express.Router();

  router.put("/", updateUserById);
  router.delete("/:id", admin, deleteUserById);
  
  export default router;