import { Router} from "express";
import lineupsController from '../controllers/lineups.controller';

const router = Router();

// Define routes

// GET ALL
router.get("/", lineupsController.getAllLineups);

// GET BY ID

router.get("/:name", lineupsController.getLineupByOwner);

// POST
router.post("/", lineupsController.createLineup);

// PUT
router.put("/:name", lineupsController.updateLineup);

// DELETE

router.delete("/:name", lineupsController.removeLineup);

export default router;