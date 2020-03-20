import { DutchPileState } from 'store/dutchPile';

export const initialDutchPileState: DutchPileState  = {
  color: null,
  cardValue: null,
  active: false
};

export const dutchPileReducer = (): DutchPileState => {
  return initialDutchPileState;
};
