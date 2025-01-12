import { Router } from "express";
import authController from "../controllers/auth.controller";

const router = Router();

// Login route
router.post("/login", authController.login);

// Logout route
router.post("/logout", authController.logout);

// Refresh token route
router.post("/refresh", authController.refresh);

export default router;
