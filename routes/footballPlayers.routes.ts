import { Router} from "express";
import footballPlayersController from '../controllers/footballPlayers.controller';

const router = Router();

// Define routes

// GET ALL
router.get("/", footballPlayersController.getAllFootballPlayers);

// GET BY ID

router.get("/:name", footballPlayersController.getFootballPlayerByName);

// POST
router.post("/", footballPlayersController.createFootballPlayer);

// PUT
router.put("/:name", footballPlayersController.updateFootballPlayer);

// DELETE

router.delete("/:name", footballPlayersController.removeFootballPlayer);

export default router;