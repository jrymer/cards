import * as blitzPileActions from 'store/blitzPile/actions';
import { blitzPileReducer, initialBlitzPileState } from 'store/blitzPile/reducer';
import * as playerActions from 'store/players/actions';
import * as postPileActions from 'store/postPile/actions';
import { initialPostPileState, postPileReducer } from 'store/postPile/reducer';
import * as woodPileActions from 'store/woodPile/actions';
import { initialWoodPileState, woodPileReducer } from 'store/woodPile/reducer';

import { PlayerState } from '.';

export const initialPlayersState: PlayerState = {
    name: null,
    id: null,
    playerNumber: null,
    startTime: null,
    hand: {
        blitzPile: null,
        postPile: null,
        woodPile: null
    }
};

type combinedActions = playerActions.PlayerActionTypes
    | blitzPileActions.BlitzDeckActionTypes
    | postPileActions.PostPileActionTypes
    | woodPileActions.WoodPileActionTypes

export const playerReducer = (state = initialPlayersState, action: combinedActions) => {
    switch (action.type) {
        case playerActions.SET_CURRENT_PLAYER: {
            return {
                ...state,
                ...action.payload,
                hand: {
                    ...state.hand,
                    blitzPile: initialBlitzPileState,
                    postPile: initialPostPileState,
                    woodPile: initialWoodPileState
                }
            }
        }
        case blitzPileActions.INITIALIZE_BLITZ_DECK:
        case blitzPileActions.NEW_TOP_CARD:
            return {
                ...state,
                hand: {
                    ...state.hand,
                    blitzPile: blitzPileReducer(state.hand.blitzPile, action)
                }
            }
        case postPileActions.INITIALIZE_POST_PILE:
        case postPileActions.ADD_TOP_BLITZ_TO_POST_PILE:
            return {
                ...state,
                hand: {
                    ...state.hand,
                    postPile: postPileReducer(state.hand.postPile, action)
                }
            }
        case woodPileActions.INITIALIZE_WOOD_PILE:
        case woodPileActions.PLAY_WOOD_PILE_TOP_CARD:
        case woodPileActions.REDRAW_WOOD_PILE:
        case woodPileActions.REMOVE_CARD_FROM_WOOD_PILE:
        case woodPileActions.SHUFFLE_WOOD_PILE:
            return {
                ...state,
                hand: {
                    ...state.hand,
                    woodPile: woodPileReducer(state.hand.woodPile, action)
                }
            }
        default:
            return state;
    }
}
