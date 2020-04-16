import { PlayerNumber } from 'models/playerNumbers';

import { GameResponse } from '.';

export const INITIALIZE_GAME = '[GAME] INITIALIZE_GAME';
export const SET_GAME_ID = '[GAME] SET_GAME_ID';
export const SET_ACTIVE_PLAYERS = '[GAME] SET_ACTIVE_PLAYERS';

interface InitializeGameAction {
    type: typeof INITIALIZE_GAME;
    payload: GameResponse;
}

interface SetActivePlayersAction {
    type: typeof SET_ACTIVE_PLAYERS;
    payload: PlayerNumber[];
}

interface SetGameIdAction {
    type: typeof SET_GAME_ID;
    payload: string;
}

export const initializeGame = (gameResponse: GameResponse): InitializeGameAction => ({
    type: INITIALIZE_GAME,
    payload: gameResponse
});

export const setActivePlayers = (playerIds: PlayerNumber[]): SetActivePlayersAction => ({
    type: SET_ACTIVE_PLAYERS,
    payload: playerIds
});

export const setGameId = (gameId: string): SetGameIdAction => ({
    type: SET_GAME_ID,
    payload: gameId
});

export type GameActionTypes = InitializeGameAction | SetActivePlayersAction | SetGameIdAction;
