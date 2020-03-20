import { BlitzPileState } from 'store/blitzPile';
import * as blitzPileActions from 'store/blitzPile/actions';

export const initialBlitzPileState: BlitzPileState = {
  blitzDeck: []
};

export const blitzPileReducer = (state = initialBlitzPileState, action: blitzPileActions.BlitzDeckActionTypes): BlitzPileState => {
  switch (action.type) {
    case blitzPileActions.INITIALIZE_BLITZ_DECK:
      return {
        ...state,
        blitzDeck: action.payload
      }
    case blitzPileActions.NEW_TOP_CARD: {
      return {
        blitzDeck: state.blitzDeck.slice(1)
      }
    }
    default:
      return state;
  }
};
