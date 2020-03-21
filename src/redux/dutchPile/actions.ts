import { Card } from 'models/card';
import { Piles } from 'models/piles';

export const ADD_ACTIVE_CARD_TO_DUTCH_PILE = '[DUTCH] ADD_ACTIVE_CARD_TO_DUTCH_PILE';
export const CREATE_DUTCH_PILE = '[DUTCH] CREATE_DUTCH_PILE';
export const SET_ACTIVE_WOOD_CARD = '[DUTCH] SET_ACTIVE_WOOD_CARD';
export const SET_ACTIVE_POST_CARD = '[DUTCH] SET_ACTIVE_POST_CARD';
export const SET_ACTIVE_BLITZ_CARD = '[DUTCH] SET_ACTIVE_BLITZ_CARD';
export const CLEAR_ACTIVE_CARD = '[DUTCH] CLEAR_ACTIVE_CARD';

interface AddActiveCardToDutchPile {
  type: typeof ADD_ACTIVE_CARD_TO_DUTCH_PILE;
  payload: string;
}

interface CreateDutchPile {
  type: typeof CREATE_DUTCH_PILE;
  payload: Card;
}

export interface SetActiveBlitzCard {
  type: typeof SET_ACTIVE_BLITZ_CARD;
  payload: {
    card: Card;
    pile: Piles;
  };
}

export interface SetActiveWoodCard {
  type: typeof SET_ACTIVE_WOOD_CARD;
  payload: {
    card: Card;
    pile: Piles;
  };
}

export interface SetActivePostCard {
  type: typeof SET_ACTIVE_POST_CARD;
  payload: {
    card: Card;
    pile: Piles;
  };
}

interface ClearActiveCard {
  type: typeof CLEAR_ACTIVE_CARD;
}


export const addActiveCardToDutchPile = (id: string): AddActiveCardToDutchPile => {
  return {
    type: ADD_ACTIVE_CARD_TO_DUTCH_PILE,
    payload: id
  };
};

export const createDutchPile = (card: Card): CreateDutchPile => {
  return {
    type: CREATE_DUTCH_PILE,
    payload: card
  };
};

export const setActiveWoodCard = (card: Card): SetActiveWoodCard => {
  return {
    type: SET_ACTIVE_WOOD_CARD,
    payload: {
      card,
      pile: Piles.WOOD
    }
  };
};

export const setActivePostCard = (card: Card): SetActivePostCard => {
  return {
    type: SET_ACTIVE_POST_CARD,
    payload: {
      card,
      pile: Piles.POST
    }
  };
};

export const setActiveBlitzCard = (card: Card): SetActiveBlitzCard => {
  return {
    type: SET_ACTIVE_BLITZ_CARD,
    payload: {
      card,
      pile: Piles.BLITZ
    }
  };
};

export const clearActiveCard = (): ClearActiveCard => {
  return {
    type: CLEAR_ACTIVE_CARD
  }
}

export type DutchPileActions = AddActiveCardToDutchPile | CreateDutchPile | SetActiveBlitzCard | SetActivePostCard | SetActiveWoodCard | ClearActiveCard;
