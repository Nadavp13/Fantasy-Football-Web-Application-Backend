import { Router } from "express";
import usersController from "../controllers/users.controller";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

// GET ALL - Protected
router.get("/", authenticate, usersController.getAllUsers);  

// GET BY EMAIL - Protected
router.get("/:email", authenticate, usersController.getUserByEmail);

// POST - Public (Signup)
router.post("/", usersController.createUser);

// PUT - Protected
router.put("/:email", authenticate, usersController.updateUser);

// DELETE - Protected
router.delete("/:email", authenticate, usersController.removeUser);


export default router;
