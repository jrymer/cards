import { Card } from 'models/card';

export const INITIALIZE_BLITZ_DECK = '[BLITZ] INITIALIZE_BLITZ_DECK';
export const NEW_TOP_CARD = '[BLITZ] NEW_TOP_CARD';

interface InitializeBlitzDeckAction {
  type: typeof INITIALIZE_BLITZ_DECK;
  payload: Card[];
}

interface NewTopCardAction {
  type: typeof NEW_TOP_CARD;
}

/**
 * Initializes the first blitz deck and the first top card of the blitz deck
 *
 * @param {Card[]} deck New blitz deck to be intialized
 * @returns {InitializeBlitzDeckAction} A deck with a top card
 */
export const initializeBlitzDeck = (playerId: any, deck: Card[]): InitializeBlitzDeckAction => {
  return {
    type: INITIALIZE_BLITZ_DECK,
    payload: deck
  }
};

/**
 * Takes the blitz deck, removes a card from the deck, and returns that card as the new top card
 *
 * @returns {NewTopCardAction} A deck with a new top card
 */
export const newTopBlitzCard = (): NewTopCardAction => {
  return {
    type: NEW_TOP_CARD
  }
};

export type BlitzDeckActionTypes =
  InitializeBlitzDeckAction
  | NewTopCardAction;