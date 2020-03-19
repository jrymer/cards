import { IDutchPileState } from 'store/dutchPile';

export const initialDutchPileState: IDutchPileState  = {
  color: null,
  state: null,
  active: false
};

export const dutchPileReducer = (): IDutchPileState => {
  return initialDutchPileState;
};
