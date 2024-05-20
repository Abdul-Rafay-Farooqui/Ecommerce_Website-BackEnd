import express from "express";

import { login, signup, signupAdmin } from "../api/Auth/controller.js";

import userRoutes from "../api/User/routes.js";
import categoryRoutes from "../api/Categories/routes.js";
import productRoutes from "../api/Products/routes.js";
import orderRoutes from "../api/Order/routes.js";
import { isAuth } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/", (req, res) => res.send("API Running"));
router.post("/login", login);
router.post("/register", signup);
router.post("/register/admin", signupAdmin);

router.use("/user", isAuth, userRoutes);
router.use("/category", categoryRoutes);
router.use("/product", productRoutes);
router.use("/order", isAuth, orderRoutes);

export default router;
