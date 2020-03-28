import { GameState } from '.';
import { State } from '../';

export const selectGameState = (state: State): GameState => state.gameState;
export const selectGameId = (state: State): string => Object.keys(selectGameState(state))[0];
