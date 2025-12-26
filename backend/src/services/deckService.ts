import { DeckCard, ParsedCard } from "../models/decks";
import { parseArchidektURL } from "../utils/archidektParser";
import {pool} from "./db";




async function addDeck(deckname : string, owner : string, commander: string) : Promise<number> {
    
    const deckId = await pool.query(`INSERT INTO decks (name, owner, commander) VALUES ($1, $2, $3) RETURNING id`,
            [deckname, owner, commander]
    );
    
    console.log("New deck with ID: ", deckId.rows[0].id, "and name", deckname);

    return new Promise((resolve, reject) => {

    });

}
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

async function test(deckname : string, owner : string, commander: string, decklistURL : string) {

    const decklist = await parseArchidektURL(decklistURL);
    addDeck(deckname, owner, commander);

}

async function testAdd(){
    const originalString = "goad";
    const timestamp = new Date().toISOString();
    const deck = `${originalString}${timestamp}`;
    addDeck(deck, "pesche", "sygg");
}
async function testAddCards(){
    const URL = "https://archidekt.com/decks/17250632/azula_dimir";
    const decklist = await parseArchidektURL(URL);
    upsertCards(decklist);
}
testAddCards();