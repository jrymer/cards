import { DutchPileState } from 'store/dutchPile';
import * as dutchPileActions from 'store/dutchPile/actions';

export const dutchPileReducer = (state = {}, action: dutchPileActions.DutchPileActionTypes): DutchPileState => {
  switch (action.type) {
    case dutchPileActions.UPDATE_DUTCH_PILES:
      return {
        ...state,
        ...action.payload
      }
      case dutchPileActions.RESET_DUTCH_PILES:
        return {};
    default:
      return state;
  }
};
