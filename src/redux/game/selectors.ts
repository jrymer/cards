import { GameStates } from 'models/games';
import { PlayerNumber } from 'models/playerNumbers';

import { GameState } from '.';
import { State } from '../';

export const selectGameState = (state: State): GameState => state.game;
export const selectGameId = (state: State): string => selectGameState(state).gameId;
export const selectActivePlayers = (state: State): PlayerNumber[] => selectGameState(state).activePlayers;
export const selectGameStatus = (state: State): GameStates => selectGameState(state).gameState;
