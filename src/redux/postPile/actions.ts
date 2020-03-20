import { Card } from 'models/card';

export const INITIALIZE_POST_PILE = '[POST] INITIALIZE_POST_PILE';
export const ADD_TOP_BLITZ_TO_POST_PILE = '[POST] ADD_TOP_BLITZ_TO_POST_PILE';

interface InitializePostPileAction {
  type: typeof INITIALIZE_POST_PILE;
  payload: Card[];
}

interface TopBlitzToPostPileAction {
  type: typeof ADD_TOP_BLITZ_TO_POST_PILE;
  payload: Card[];
}

export const initializePostPile = (deck: Card[]): InitializePostPileAction => {
  return {
    type: INITIALIZE_POST_PILE,
    payload: deck
  }
};

export const topBlitzCardToPostPile = (newPostPile: Card[]): TopBlitzToPostPileAction => {
  return {
    type: ADD_TOP_BLITZ_TO_POST_PILE,
    payload: newPostPile
  }
};

export type PostPileActionTypes = InitializePostPileAction
| TopBlitzToPostPileAction;