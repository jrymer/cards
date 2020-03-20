import { PostPileState } from 'store/postPile';
import * as postPileActions from 'store/postPile/actions';

export const initialPostPileState: PostPileState = {
  availableCards: [
    {
      color: null,
      cardValue: 0
    }
  ]
};

export const postPileReducer = (state = initialPostPileState, action: postPileActions.PostPileActionTypes): PostPileState => {
  switch (action.type) {
    case postPileActions.INITIALIZE_POST_PILE:
      return {
        ...state,
        availableCards: action.payload
      };
    case postPileActions.ADD_TOP_BLITZ_TO_POST_PILE:
      return {
        ...state,
        availableCards: action.payload
      };
    default:
      return state;
  }
};
