import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { GameState } from './game';
import { gameReducer } from './game/reducer';

export interface State {
  games: GameState;
}

const rootReducer = combineReducers({
  games: gameReducer
});

const initialRootState: State = {
  games: null
};

export const store = createStore(
  rootReducer,
  initialRootState,
  composeWithDevTools()
);

export type AppState = ReturnType<typeof rootReducer>;
