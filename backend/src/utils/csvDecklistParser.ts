import fs from "fs"; 
import {parse} from "csv-parse";
import {DeckCard} from "../models/decks";




/**
 * Determine if a card is a basic land
 * @param cardname Name of the card
 * @returns True if the card is a basic land
 */
function isBasic(cardname : string) : boolean {
    return ["Plains","Island","Swamp","Mountain","Forest","Wastes"].includes(cardname);
}

/**
 * Function that parses a CSV Decklist
 * @param filepath: the path to the decklist saved as a CSV with columns Qauntity, Name
 * @returns a list of DeckCard objects that represent the EDH deck.
 */ 
export async function parseDecklist(filepath: string) : Promise<DeckCard[]> {

    return new Promise((resolve, reject)  => {
        const cards: DeckCard[] = [];


        fs.createReadStream(filepath)
            .pipe(parse({ columns : true, trim : true}))
            .on("data", (row:any) => {
                
                const cardname = row.Name;
                const quantity = parseInt(row.Quantity, 10);
                
                /** Check if EDH singleton rule is violated
                 *  Multiple basic lands are alowed
                 */
                if  (quantity > 1 && !isBasic(cardname)){
                    reject("multiples of a non-basic-land card!")
                }
                cards.push({
                    name: cardname,
                    count: quantity
                 });

            })
            .on("end", () => resolve(cards))
            .on("error", (err) => reject(err));
    });

}
