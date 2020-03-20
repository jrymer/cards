import { Card } from 'models/card';

export const INITIALIZE_WOOD_PILE = '[WOOD] INITIALIZE_WOOD_PILE';
export const PLAY_WOOD_PILE_TOP_CARD = '[WOOD] PLAY_WOOD_PILE_TOP_CARD';
export const REDRAW_WOOD_PILE = '[WOOD] REDRAW_WOOD_PILE';

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

export const initializeWoodPile = (deck: Card[]): InitializeWoodPileAction => {
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

export type WoodPileActionTypes = InitializeWoodPileAction
  | RedrawWoodPile
  | PlayWoodPileTopCard;
