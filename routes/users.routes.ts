import { Router } from "express";
import usersController from "../controllers/users.controller";

const router = Router();

// Define routes

// GET ALL
router.get("/", usersController.getAllUsers);

// GET BY EMAIL
router.get("/:email", usersController.getUserByEmail);

// POST
router.post("/", usersController.createUser);

// PUT
router.put("/:email", usersController.updateUser);

// DELETE
router.delete("/:email", usersController.removeUser);

export default router;
