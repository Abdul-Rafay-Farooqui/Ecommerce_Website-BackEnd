import express from "express";

import { login, signup } from "../api/Auth/controller.js";

const router = express.Router();

router.get("/", (req, res) => res.send("API Running"));
router.post("/login", login);
router.post("/register", signup);

export default router;