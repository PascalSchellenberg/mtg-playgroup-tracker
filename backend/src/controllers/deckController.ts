import {addDeck} from "../services/deckService"
import { Request, Response } from "express";
import { getAllDecks } from "../services/deckService";
export const createDeck = async (req: Request, res: Response) => {
    try {
        const {owner, deckName, commander} = req.body;
        const deckId = await addDeck(owner, deckName,commander);
        res.json({success : true, deckId})
    } catch (err : any) {
        console.error(err);
        res.status(500).json({success : false, error : err.message});
    }
};

export async function getDecks(req: Request, res: Response) {
  try {
    const decks = await getAllDecks();
    res.json(decks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load decks" });
  }
}