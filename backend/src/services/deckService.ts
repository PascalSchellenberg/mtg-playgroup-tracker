import { Deck, DeckCard, ParsedCard } from "../models/decks";
import { parseArchidektURL } from "../utils/archidektParser";
import {pool} from "./db";


/**
 * Function that adds a new deck to the Database.
 * @param deckname 
 * @param owner 
 * @param commander 
 * @returns deckId of the newly added Deck.
 */

export async function addDeck(deckname : string, owner : string, commander: string) : Promise<number> {
    
    const db_res = await pool.query(`INSERT INTO decks (name, owner, commander) 
        VALUES ($1, $2, $3) RETURNING id`,
            [deckname, owner, commander]
    );
    const deckId = db_res.rows[0].id;
    console.log("New deck with ID: ", deckId, "and name", deckname);

    return deckId;

}

/**
 * Upserts cards into the database that are used in the decklist.
 * @param decklist 
 */
async function upsertCards(decklist : ParsedCard[]){
    const values = [];
    const placeholders = [];

    let idx = 1;
    for (let pc of decklist){
        placeholders.push(`($${idx}, $${idx+1})`);
        values.push(pc.name, pc.scryfallId);
        idx += 2;
    }


    const query = `INSERT INTO cards (name, scryfall_id) VALUES ${placeholders.join(", ")}
                    ON CONFLICT (scryfall_id) DO NOTHING`;
    await pool.query(query, values);
    console.log("Inserted new Cards into Database!")

}

export async function getAllDecks() : Promise<Deck[]> {

    const getAllDecksQuery = `SELECT id, name, owner, commander FROM decks`;
    const result = await pool.query(getAllDecksQuery);
    return result.rows as Deck[];
}