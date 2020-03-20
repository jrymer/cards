import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BlitzPileState } from 'store/blitzPile';
import { blitzPileReducer, initialBlitzPileState } from 'store/blitzPile/reducer';
import { DutchPileState } from 'store/dutchPile';
import { dutchPileReducer, initialDutchPileState } from 'store/dutchPile/reducer';
import { PostPileState } from 'store/postPile';
import { initialPostPileState, postPileReducer } from 'store/postPile/reducer';
import { WoodPileState } from 'store/woodPile';
import { initialWoodPileState, woodPileReducer } from 'store/woodPile/reducer';

export interface State {
  blitzPile: BlitzPileState;
  dutchPile: DutchPileState;
  postPile: PostPileState;
  woodPile: WoodPileState;
}

const rootReducer = combineReducers({
  blitzPile: blitzPileReducer,
  dutchPile: dutchPileReducer,
  postPile: postPileReducer,
  woodPile: woodPileReducer
});

const initialRootState: State = {
  blitzPile: initialBlitzPileState,
  dutchPile: initialDutchPileState,
  postPile: initialPostPileState,
  woodPile: initialWoodPileState
};

export const store = createStore(
  rootReducer,
  initialRootState,
  composeWithDevTools()
);

export type AppState = ReturnType<typeof rootReducer>;
