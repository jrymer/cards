import { IBlitzPileState } from 'store/blitzPile';
import { initialTopCard } from 'store/card';

export const initialBlitzPileState: IBlitzPileState  = {
  cardsRemaining: null,
  topCard: initialTopCard
};

export const blitzPileReducer = (): IBlitzPileState => {
  return initialBlitzPileState;
};
