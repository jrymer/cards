import { initialTopCard } from 'models/card';
import { IBlitzPileState } from 'store/blitzPile';

export const initialBlitzPileState: IBlitzPileState  = {
  cardsRemaining: null,
  topCard: initialTopCard
};

export const blitzPileReducer = (): IBlitzPileState => {
  return initialBlitzPileState;
};
