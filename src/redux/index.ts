import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { GameState } from './game';
import { gameReducer } from './game/reducer';

export interface State {
  gameState: GameState;
}

const rootReducer = combineReducers({
  gameState: gameReducer
});

const initialRootState: State = {
  gameState: null
};

export const store = createStore(
  rootReducer,
  initialRootState,
  composeWithDevTools()
);

export type AppState = ReturnType<typeof rootReducer>;
