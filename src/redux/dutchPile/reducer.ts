import { DutchPileState } from 'store/dutchPile';
import * as dutchPileActions from 'store/dutchPile/actions';
import { uuid } from 'utils/uuid';

export const initialDutchPileState: DutchPileState = {
  activeCard: null,
  activePiles: null,
  completedPiles: null
};

export const dutchPileReducer = (state = initialDutchPileState, action: dutchPileActions.DutchPileActions): DutchPileState => {
  switch (action.type) {
    case dutchPileActions.SET_ACTIVE_BLITZ_CARD:
    case dutchPileActions.SET_ACTIVE_POST_CARD:
    case dutchPileActions.SET_ACTIVE_WOOD_CARD:
      return {
        ...state,
        activeCard: { ...action.payload }
      };
    case dutchPileActions.CREATE_DUTCH_PILE: {
      const { cardValue } = action.payload;
      const id = uuid();
      return {
        ...state,
        activePiles: {
          ...state.activePiles,
          [id]: { [cardValue]: action.payload }
        }
      }
    }
    case dutchPileActions.ADD_ACTIVE_CARD_TO_DUTCH_PILE:
      return {
        ...state,
        activePiles: {
          ...state.activePiles,
          [action.payload]: {
            ...state.activePiles[action.payload],
            [state.activeCard.card.cardValue]: {
              ...state.activeCard.card
            }
          }
        }
      }
    case dutchPileActions.CLEAR_ACTIVE_CARD:
      return {
        ...state,
        activeCard: null
      }
    default:
      return state;
  }
};
