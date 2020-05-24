import { DutchPileState } from 'store/dutchPile';
import * as dutchPileActions from 'store/dutchPile/actions';

export const initialDutchPileState: DutchPileState = {
  action: null,
  activeCard: null,
  activePiles: null,
  completedPiles: null
};

export const dutchPileReducer = (state = initialDutchPileState, action: dutchPileActions.DutchPileActionTypes): DutchPileState => {
  switch (action.type) {
    case dutchPileActions.SET_ACTIVE_BLITZ_CARD:
    case dutchPileActions.SET_ACTIVE_POST_CARD:
    case dutchPileActions.SET_ACTIVE_WOOD_CARD:
      return {
        ...state,
        activeCard: { ...action.payload }
      };
    case dutchPileActions.CREATE_DUTCH_PILE: {
      const { card, dutchPileId } = action.payload;
      return {
        ...state,
        activePiles: {
          ...state.activePiles,
          [dutchPileId]: { [card.cardValue]: card }
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
    case dutchPileActions.UPDATE_DUTCH_PILES_FROM_FIREBASE: {
      const { dutchPileId, card } = action.payload
      return {
        ...state,
        activePiles: {
          ...state.activePiles,
          [dutchPileId]: {
            ...state.activePiles[dutchPileId],
            [card.cardValue]: {
              ...state.activePiles[dutchPileId][card.cardValue],
              ...card
            }
          }
        }
      }
    }
    case dutchPileActions.SET_DUTCH_PILE_ACTION:
      return {
        ...state,
        action: action.payload
      }
    case dutchPileActions.RESET_DUTCH_PILES:
      return {
        ...initialDutchPileState
      }
    default:
      return state;
  }
};
