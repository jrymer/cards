import { Card } from 'models/card';

export const INITIALIZE_WOOD_PILE = '[WOOD] INITIALIZE_WOOD_PILE';
export const PLAY_WOOD_PILE_TOP_CARD = '[WOOD] PLAY_WOOD_PILE_TOP_CARD';
export const REDRAW_WOOD_PILE = '[WOOD] REDRAW_WOOD_PILE';
export const REMOVE_CARD_FROM_WOOD_PILE = '[WOOD] REMOVE_CARD_FROM_WOOD_PILE';
export const SHUFFLE_WOOD_PILE = '[WOOD] SHUFFLE_WOOD_PILE';

interface InitializeWoodPileAction {
  type: typeof INITIALIZE_WOOD_PILE;
  payload: Card[];
}

interface RedrawWoodPile {
  type: typeof REDRAW_WOOD_PILE;
}

interface PlayWoodPileTopCard {
  type: typeof PLAY_WOOD_PILE_TOP_CARD;
}

interface RemoveCardFromWoodPile {
  type: typeof REMOVE_CARD_FROM_WOOD_PILE;
  payload: Card;
}

interface ShuffleWoodPile {
  type: typeof SHUFFLE_WOOD_PILE;
}

export const initializeWoodPile = (playerId: any, deck: Card[]): InitializeWoodPileAction => {
  return {
    type: INITIALIZE_WOOD_PILE,
    payload: deck
  }
};

export const redrawWoodPile = (): RedrawWoodPile => {
  return {
    type: REDRAW_WOOD_PILE
  }
};

export const playWoodPileTopCard = (): PlayWoodPileTopCard => {
  return {
    type: PLAY_WOOD_PILE_TOP_CARD
  }
};

export const removeCardFromWoodPile = (card: Card): RemoveCardFromWoodPile => {
  return {
    type: REMOVE_CARD_FROM_WOOD_PILE,
    payload: card
  }
};

export const shuffleWoodPile = (): ShuffleWoodPile => {
  return {
    type: SHUFFLE_WOOD_PILE
  }
};

export type WoodPileActionTypes = InitializeWoodPileAction
  | RedrawWoodPile
  | PlayWoodPileTopCard
  | RemoveCardFromWoodPile
  | ShuffleWoodPile;
