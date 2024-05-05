import express from "express";

import { login, signup } from "../api/Auth/controller.js";

import userRoutes from "../api/User/routes.js";
import { isAuth } from "../middlewares/authMiddlewares.js";


const router = express.Router();

router.get("/", (req, res) => res.send("API Running"));
router.post("/login", login);
router.post("/register", signup);

router.use("/user", isAuth, userRoutes);


export default router;