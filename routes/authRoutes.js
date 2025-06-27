import express from "express";
import authController from "../controllers/AuthController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.post("/logout", (req, res) => authController.logout(req, res));
router.get("/profile", authMiddleware, (req, res) => authController.profile(req, res));

export default router;
