/**
 * decks.ts
 * 
 * Definitions of an EDH-Deck and a Magic-Card.
 * Helper functions for handling decks.
 * 
 */

export interface Deck {

    id: number,
    /** Custom Name a user can give the deck */
    name: string,
    owner: string,
    commander: string,
    cards: DeckCard[];

}

export interface DeckCard {

    name: string,
    count: number,
    /** optional set identifier if desired */
    set?: string,

}
/** check if a deck is a valid EDH deck (100 singletons including commander
 * @param deck to validate
 * @returns True if the deck is a legal EDH deck
 */
export function isLegalDeck(deck: Deck) : boolean {
    
    return deck.cards.length == 100;

}