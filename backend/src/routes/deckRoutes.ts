import { Router } from "express";
import { createDeck, getDecks } from "../controllers/deckController";
const router = Router();

router.post("/", createDeck);
router.get("/", getDecks);

export default router