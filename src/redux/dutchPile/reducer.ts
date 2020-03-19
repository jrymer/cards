import { IDutchPileState } from './dutchPile';

export const initialDutchPileState: IDutchPileState  = {
  void: ''
};

export const dutchPileReducer = (): IDutchPileState => {
  return {void: ''};
};
