import { initialBlitzPileState } from 'store/blitzPile/reducer';
import * as playerActions from 'store/players/actions';
import { initialPostPileState } from 'store/postPile/reducer';
import { initialWoodPileState } from 'store/woodPile/reducer';

import { PlayerState } from '.';

export const initialPlayersState: PlayerState = null;

export const playerReducer = (state = initialPlayersState, action: playerActions.PlayerActionTypes) => {
    switch (action.type) {
        case playerActions.ADD_PLAYER: {
            return {
                ...state,
                [action.payload.player.playerNumber as string]: {
                    ...action.payload.player,
                    hand: {
                        ...state.hand,
                        blitzPile: initialBlitzPileState,
                        postPile: initialPostPileState,
                        woodPile: initialWoodPileState
                    }
                }
            }
        }
        default:
            return state;
    }
}
