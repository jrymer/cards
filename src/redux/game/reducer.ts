import * as blitzPileActions from 'store/blitzPile/actions';
import { blitzPileReducer } from 'store/blitzPile/reducer';
import { GameState } from 'store/game';
import * as gameActions from 'store/game/actions';
import * as playerActions from 'store/players/actions';
import { initialPlayersState, playerReducer } from 'store/players/reducer';
import * as postPileActions from 'store/postPile/actions';
import { postPileReducer } from 'store/postPile/reducer';
import * as woodPileActions from 'store/woodPile/actions';
import { woodPileReducer } from 'store/woodPile/reducer';

export const initialGameState: GameState = {
    activePlayers: [],
    gameId: null,
    player: initialPlayersState,
    dutchPiles: null
};

type combinedActions = gameActions.GameActionTypes
    | playerActions.PlayerActionTypes
    | blitzPileActions.BlitzDeckActionTypes
    | postPileActions.PostPileActionTypes
    | woodPileActions.WoodPileActionTypes;

export const gameReducer = (state = initialGameState, action: combinedActions) => {
    switch (action.type) {
        case gameActions.INITIALIZE_GAME:
            return {
                ...state,
                ...action.payload
            }
        case gameActions.SET_GAME_ID:
            return {
                ...state,
                gameId: action.payload
            }
        case gameActions.SET_ACTIVE_PLAYERS:
            return {
                ...state,
                activePlayers: action.payload
            }
        case gameActions.SET_PLAYER_ACTIVE:
            return {
                ...state,
                activePlayers: [...state.activePlayers, action.payload]
            }
        case playerActions.SET_CURRENT_PLAYER:
            return {
                ...state,
                player: playerReducer(state.player, action)
            }
        case blitzPileActions.INITIALIZE_BLITZ_DECK:
        case blitzPileActions.NEW_TOP_CARD:
            return {
                ...state,
                player: {
                    ...state.player,
                    hand: {
                        ...state.player.hand,
                        blitzPile: blitzPileReducer(state.player.hand.blitzPile, action)
                    }
                }
            }
        case postPileActions.INITIALIZE_POST_PILE:
        case postPileActions.ADD_TOP_BLITZ_TO_POST_PILE:
            return {
                ...state,
                player: {
                    ...state.player,
                    hand: {
                        ...state.player.hand,
                        postPile: postPileReducer(state.player.hand.postPile, action)
                    }
                }
            }
        case woodPileActions.INITIALIZE_WOOD_PILE:
        case woodPileActions.PLAY_WOOD_PILE_TOP_CARD:
        case woodPileActions.REDRAW_WOOD_PILE:
        case woodPileActions.REMOVE_CARD_FROM_WOOD_PILE:
        case woodPileActions.SHUFFLE_WOOD_PILE:
            return {
                ...state,
                player: {
                    ...state.player,
                    hand: {
                        ...state.player.hand,
                        woodPile: woodPileReducer(state.player.hand.woodPile, action)
                    }
                }
            }
        default:
            return state;
    }
}

