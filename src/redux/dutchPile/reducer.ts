import { IDutchPileState } from 'store/dutchPile';

export const initialDutchPileState: IDutchPileState  = {
  color: null,
  cardValue: null,
  active: false
};

export const dutchPileReducer = (): IDutchPileState => {
  return initialDutchPileState;
};
