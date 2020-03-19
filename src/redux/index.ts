import { combineReducers, createStore } from 'redux';

import { blitzPileReducer, initialBlitzPileState } from './blitzPile/reducer';
import { dutchPileReducer, initialDutchPileState } from './dutchPile/reducer';
import { initialPostPileState, postPileReducer } from './postPile/reducer';
import { initialWoodPileState, woodPileReducer } from './woodPile/reducer';


// import { composeWithDevTools } from 'redux-devtools-extension';


const rootReducer = combineReducers({
  blitzPileState: blitzPileReducer,
  dutchPileState: dutchPileReducer,
  postPileState: postPileReducer,
  woodPileState: woodPileReducer
});

const initialRootState = {
  blitzPileState: initialBlitzPileState,
  dutchPileState: initialDutchPileState,
  postPileState: initialPostPileState,
  woodPileState: initialWoodPileState
};

export const store = createStore(
  rootReducer,
  initialRootState,
  // composeWithDevTools()
);

export type AppState = ReturnType<typeof rootReducer>;
