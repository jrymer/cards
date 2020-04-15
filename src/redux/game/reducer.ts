import { GameState } from 'store/game';
import * as gameActions from 'store/game/actions';
import * as playerActions from 'store/players/actions';
import { playerReducer } from 'store/players/reducer';

export const initialGameState: GameState = null;

export const gameReducer = (state = initialGameState, action: gameActions.GameActionTypes | playerActions.PlayerActionTypes) => {
    switch (action.type) {
        case playerActions.ADD_PLAYER:
            return {
                ...state,
                [action.payload.gameId]: {
                    ...state[action.payload.gameId],
                    players: playerReducer(state[action.payload.gameId].players, action)
                }
            }
        case gameActions.INITIALIZE_GAME:
            return {
                ...state,
                [action.payload]: {
                    players: {},
                    dutchPiles: {}
                }
            }
        default:
            return state;
    }
}

