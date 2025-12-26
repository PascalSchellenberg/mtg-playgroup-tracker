
import axios from "axios";
import { DeckCard, ParsedCard } from "../models/decks";

const URL = "https://archidekt.com/decks/17428286/azula_pew_pew";


function extractDeckId(url : string) : string {

    const regex = /archidekt\.com\/decks\/(\d+)/;
    const id = url.match(regex);
    if (!id) throw new Error("Invalid Archidekt URL");
    return id[1];

}

export async function fetchArchidektJSON(url: string) {


    const deckId = extractDeckId(url);
    const archiURL = `https://archidekt.com/api/decks/${deckId}/`;
    const response = await axios(archiURL);
    
    return response.data;

}

export async function parseArchidektURL(url : string) : Promise<ParsedCard[]> {

   const deck_json = await(fetchArchidektJSON(url));
   const sideboards = ["Maybeboard", "Sideboard"];
   const parsedCards : ParsedCard[] = [];
   


   for(const card of deck_json.cards){

    if (!card.categories.some((cat :any)  => sideboards.includes(cat))){
        console.log(card.categories);
        parsedCards.push({
            name: card.card.oracleCard.name,
            count: card.quantity,
            scryfallId: card.card.uid
        });
    }

   }
   /** 
   const parsedCards: ParsedCard[] = main_cards.cards.map((c: any) => ({
        name: c.card.oracleCard.name,
        count: c.quantity,
        scryfallId : c.card.uid
   }));
   */
   console.log(parsedCards);
   console.log(parsedCards.length);
   return parsedCards;
}


async function test(url :string) {

    parseArchidektURL(URL);

}
test(URL);
