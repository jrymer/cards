import { PlayerImages } from 'models/card';
import { GameStatus } from 'models/games';
import { PlayerNumber } from 'models/playerNumbers';
import { Player } from 'store/players';
import { selectCurrentPlayerState } from 'store/players/selectors';

import { GameState } from '.';
import { State } from '../';

export const selectGameState = (state: State): GameState => state.game;
export const selectGameId = (state: State): string => {
    const metadata = selectGameState(state).gameMetadata;

    return metadata && metadata.gameId;
};
// export const selectActivePlayers = (state: State): PlayerNumber[] => selectGameState(state).activePlayers;
export const selectGameStatus = (state: State): GameStatus => selectGameState(state).gameStatus;
export const selectCurrentPlayer = (state: State): PlayerNumber => selectGameState(state).currentPlayer;
export const selectRound = (state: State): number => selectGameState(state).round;
export const selectPlayerImages = (state: State): PlayerImages[] => selectGameState(state).playerImages;
