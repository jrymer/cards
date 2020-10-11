import { PlayerNumber } from 'models/playerNumbers';

import { GameResponse, GameStateCurrentPlayerOmmitted } from '.';

export const INITIALIZE_GAME = '[GAME] INITIALIZE_GAME';
export const BUMP_ROUND = '[GAME] BUMP_ROUND';
export const SET_GAME_ID = '[GAME] SET_GAME_ID';
export const SET_GAME_LOBBY = '[GAME] SET_PRE_GAME_LOBBY';
export const SET_GAME_NEXT_ROUND_LOBBY = '[GAME] SET_GAME_NEXT_ROUND_LOBBY';
export const SET_GAME_ACTIVE = '[GAME] SET_GAME_ACTIVE';
export const SET_CURRENT_PLAYER = '[GAME] SET_CURRENT_PLAYER';
export const UPDATE_GAME = '[GAME] UPDATE_GAME';
// export const SET_SCORE = '[GAME] SET_SCORE';

interface UpdateGame {
    type: typeof UPDATE_GAME;
    payload: GameStateCurrentPlayerOmmitted;
}
interface InitializeGameAction {
    type: typeof INITIALIZE_GAME;
    payload: GameResponse;
}

interface SetGameIdAction {
    type: typeof SET_GAME_ID;
    payload: string;
}

interface SetCurrentPlayerAction {
    type: typeof SET_CURRENT_PLAYER;
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

interface BumpRoundAction {
    type: typeof BUMP_ROUND;
}

// interface SetScoreAction {
//     type: typeof SET_SCORE;
//     payload: GameScore;
// }

export const initializeGame = (gameResponse: GameResponse): InitializeGameAction => ({
    type: INITIALIZE_GAME,
    payload: gameResponse
});

export const setGameId = (gameId: string): SetGameIdAction => ({
    type: SET_GAME_ID,
    payload: gameId
});

export const setCurrentPlayer = (playerId: PlayerNumber): SetCurrentPlayerAction => ({
    type: SET_CURRENT_PLAYER,
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

export const bumpRoundNumber = (): BumpRoundAction => ({
    type: BUMP_ROUND
});

export const updateGame = (gameState: GameStateCurrentPlayerOmmitted): UpdateGame => ({
    type: UPDATE_GAME,
    payload: gameState
});

// export const setScore = (score: GameScore): SetScoreAction => ({
//     type: SET_SCORE,
//     payload: score
// });


export type GameActionTypes = InitializeGameAction
    | SetGameIdAction
    | SetCurrentPlayerAction
    | SetGameActiveAction
    | SetGameLobbyAction
    | SetGameNextRoundLobbyAction
    | BumpRoundAction
    | UpdateGame;
