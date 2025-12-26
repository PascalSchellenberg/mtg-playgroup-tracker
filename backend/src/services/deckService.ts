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
testAdd();