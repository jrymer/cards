import { WoodPileState } from 'store/woodPile';
import * as woodPileActions from 'store/woodPile/actions';

export const initialWoodPileState: WoodPileState = {
  woodPile: null
};

export const woodPileReducer = (state = initialWoodPileState, action: woodPileActions.WoodPileActionTypes): WoodPileState => {
  switch (action.type) {
    case woodPileActions.INITIALIZE_WOOD_PILE:
      return {
        woodPile: action.payload
      };
    case woodPileActions.REDRAW_WOOD_PILE: {
      const topThree = state.woodPile.slice(0, 3);
      const topThreeToBack = state.woodPile.slice(3).concat(topThree);
      return {
        woodPile: topThreeToBack,
      }
    }
    case woodPileActions.PLAY_WOOD_PILE_TOP_CARD: {
      const topThree = state.woodPile.slice(0, 3);
      const topThreeToBack = state.woodPile.slice(3).concat(topThree);
      return {
        woodPile: topThreeToBack
      }
    }
    case woodPileActions.REMOVE_CARD_FROM_WOOD_PILE:
      return {
        ...state,
        woodPile: [...state.woodPile.slice(1)]
      }
    case woodPileActions.SHUFFLE_WOOD_PILE:
      return {
        woodPile: [...state.woodPile.slice(1).concat(state.woodPile.slice(0, 1))]
      }
    default:
      return state;
  }
};
