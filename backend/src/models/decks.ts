/**
 * decks.ts
 * 
 * Definitions of an EDH-Deck and a Magic-Card.
 * Helper functions for handling decks.
 * 
 */

export interface Deck {

    id: string,
    /** Custom Name a user can give the deck */
    name: string,
    owner: string,
    commander: string,
    commadnerScryfallId?: string,
    cards?: DeckCard[];

}
export interface Card {

    id: string,
    name: string,
    scryfallId : string

}
export interface ParsedCard {
    scryfallId: string,
    name: string,
    count: number
}
export interface DeckCard {

    deckId: string,
    cardId: string, // internal ID
    count: number,

}
