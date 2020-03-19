import { initialTopCard } from 'models/card';
import { IWoodPileState } from 'store/woodPile';

export const initialWoodPileState: IWoodPileState  = {
  cardsRemaining: null,
  topCard: initialTopCard
};

export const woodPileReducer = (): IWoodPileState => {
  return initialWoodPileState;
};
