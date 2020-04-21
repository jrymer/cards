import { Card } from 'models/card';
import { DutchPileAction, Piles } from 'models/piles';

export const ADD_ACTIVE_CARD_TO_DUTCH_PILE = '[DUTCH] ADD_ACTIVE_CARD_TO_DUTCH_PILE';
export const CREATE_DUTCH_PILE = '[DUTCH] CREATE_DUTCH_PILE';
export const SET_ACTIVE_WOOD_CARD = '[DUTCH] SET_ACTIVE_WOOD_CARD';
export const SET_ACTIVE_POST_CARD = '[DUTCH] SET_ACTIVE_POST_CARD';
export const SET_ACTIVE_BLITZ_CARD = '[DUTCH] SET_ACTIVE_BLITZ_CARD';
export const CLEAR_ACTIVE_CARD = '[DUTCH] CLEAR_ACTIVE_CARD';
export const UPDATE_DUTCH_PILES_FROM_FIREBASE = '[DUTCH] UPDATE_DUTCH_PILES_FROM_FIREBASE';
export const SET_DUTCH_PILE_ACTION = '[DUTCH] SET_DUTCH_PILE_ACTION';

interface AddActiveCardToDutchPile {
  type: typeof ADD_ACTIVE_CARD_TO_DUTCH_PILE;
  payload: string;
}

interface CreateDutchPile {
  type: typeof CREATE_DUTCH_PILE;
  payload: {
    card: Card;
    dutchPileId: string;
  }
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

interface UpdateDutchPilesFromFirebaseAction {
  type: typeof UPDATE_DUTCH_PILES_FROM_FIREBASE;
  payload: {
    dutchPileId: string;
    card: Card;
  };
}

interface SetDutchPileActionAction {
  type: typeof SET_DUTCH_PILE_ACTION;
  payload: DutchPileAction;
}


export const addActiveCardToDutchPile = (dutchPileId: string): AddActiveCardToDutchPile => {
  return {
    type: ADD_ACTIVE_CARD_TO_DUTCH_PILE,
    payload: dutchPileId
  };
};

export const createDutchPile = (card: Card, dutchPileId: string): CreateDutchPile => {
  return {
    type: CREATE_DUTCH_PILE,
    payload: {
      card,
      dutchPileId
    }
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

export const updateDutchPilesFromFirebase = (dutchPileId: string, card: Card): UpdateDutchPilesFromFirebaseAction => ({
  type: UPDATE_DUTCH_PILES_FROM_FIREBASE,
  payload: {
    dutchPileId,
    card
  }
});

export const setDutchPileAction = (action: DutchPileAction): SetDutchPileActionAction => ({
  type: SET_DUTCH_PILE_ACTION,
  payload: action
});

export type DutchPileActionTypes = AddActiveCardToDutchPile
| CreateDutchPile
| SetActiveBlitzCard
| SetActivePostCard
| SetActiveWoodCard
| ClearActiveCard
| UpdateDutchPilesFromFirebaseAction
| SetDutchPileActionAction;
