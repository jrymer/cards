import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { GameState } from './game';
import { gameReducer, initialGameState } from './game/reducer';

export interface State {
  game: GameState;
}
const middlewares = [thunk];

const rootReducer = combineReducers({
  game: gameReducer
});

const initialRootState: State = {
  game: initialGameState
};

export const store = createStore(
  rootReducer,
  initialRootState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export type AppState = ReturnType<typeof rootReducer>;
