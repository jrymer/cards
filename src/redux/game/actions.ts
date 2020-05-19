import { PlayerNumber } from 'models/playerNumbers';

import { GameResponse, GameScore } from '.';

export const INITIALIZE_GAME = '[GAME] INITIALIZE_GAME';
export const START_NEXT_ROUND = '[GAME] START_NEXT_ROUND';
export const SET_GAME_ID = '[GAME] SET_GAME_ID';
export const SET_GAME_LOBBY = '[GAME] SET_GAME_LOBBY';
export const SET_GAME_NEXT_ROUND_LOBBY = '[GAME] SET_GAME_NEXT_ROUND_LOBBY';
export const SET_GAME_ACTIVE = '[GAME] SET_GAME_ACTIVE';
export const SET_ACTIVE_PLAYERS = '[GAME] SET_ACTIVE_PLAYERS';
export const SET_PLAYER_ACTIVE = '[GAME] SET_PLAYER_ACTIVE';
export const SET_SCORE = '[GAME] SET_SCORE';

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

interface SetPlayerActiveAction {
    type: typeof SET_PLAYER_ACTIVE;
    payload: PlayerNumber;
}

interface SetGameActiveAction {
    type: typeof SET_GAME_ACTIVE;
}

interface SetGameLobbyAction {
    type: typeof SET_GAME_LOBBY;
}

interface SetGameNextRoundLobbyAction {
    type: typeof SET_GAME_NEXT_ROUND_LOBBY;
}

interface StartNextRoundAction {
    type: typeof START_NEXT_ROUND;
}

interface SetScoreAction {
    type: typeof SET_SCORE;
    payload: GameScore;
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

export const setPlayerActive = (playerId: PlayerNumber): SetPlayerActiveAction => ({
    type: SET_PLAYER_ACTIVE,
    payload: playerId
});

export const setGameActive = (): SetGameActiveAction => ({
    type: SET_GAME_ACTIVE
});

export const setGameLobby = (): SetGameLobbyAction => ({
    type: SET_GAME_LOBBY
});

export const setGameNextRoundLobby = (): SetGameNextRoundLobbyAction => ({
    type: SET_GAME_NEXT_ROUND_LOBBY
});

export const startNextRound = (): StartNextRoundAction => ({
    type: START_NEXT_ROUND
});

export const setScore = (score: GameScore): SetScoreAction => ({
    type: SET_SCORE,
    payload: score
});


export type GameActionTypes = InitializeGameAction
    | SetActivePlayersAction
    | SetGameIdAction
    | SetPlayerActiveAction
    | SetGameActiveAction
    | SetGameLobbyAction
    | SetGameNextRoundLobbyAction
    | StartNextRoundAction
    | SetScoreAction;
