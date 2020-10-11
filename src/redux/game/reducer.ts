import { GameStatus } from 'models/games';
import * as gameActions from 'store/game/actions';

import { GameState } from '.';

export const initialGameState: GameState = {
    currentPlayer: null,
    gameMetadata: null,
    gameStatus: GameStatus.INACTIVE,
    round: 0
};

export const gameReducer = (state = initialGameState, action: gameActions.GameActionTypes): GameState => {
    switch (action.type) {
        case gameActions.INITIALIZE_GAME:
            return {
                ...state,
                gameMetadata: {
                    ...state.gameMetadata,
                    ...action.payload
                }
            };
        case gameActions.UPDATE_GAME:
            return {
                ...state,
                ...action.payload
            };
        case gameActions.BUMP_ROUND:
            return {
                ...state,
                round: state.round + 1
            };
        case gameActions.SET_GAME_ID:
            return {
                ...state,
                gameMetadata: {
                    ...state.gameMetadata,
                    gameId: action.payload
                }
            };
        case gameActions.SET_GAME_NEXT_ROUND_LOBBY:
            return {
                ...state,
                gameStatus: GameStatus.NEW_ROUND_LOBBY
            };
        case gameActions.SET_GAME_LOBBY:
            return {
                ...state,
                gameStatus: GameStatus.PRE_GAME_LOBBY
            };
        case gameActions.SET_GAME_ACTIVE:
            return {
                ...state,
                gameStatus: GameStatus.ACTIVE
            }
        case gameActions.SET_CURRENT_PLAYER:
            return {
                ...state,
                currentPlayer: action.payload
            }
        default:
            return state;
    }
}

