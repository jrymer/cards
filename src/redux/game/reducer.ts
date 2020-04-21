import { GameStates } from 'models/games';
import * as blitzPileActions from 'store/blitzPile/actions';
import { blitzPileReducer } from 'store/blitzPile/reducer';
import * as dutchPileActions from 'store/dutchPile/actions';
import { dutchPileReducer, initialDutchPileState } from 'store/dutchPile/reducer';
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
    gameState: null,
    player: initialPlayersState,
    dutchPiles: initialDutchPileState
};

type combinedActions = gameActions.GameActionTypes
    | playerActions.PlayerActionTypes
    | blitzPileActions.BlitzDeckActionTypes
    | postPileActions.PostPileActionTypes
    | woodPileActions.WoodPileActionTypes
    | dutchPileActions.DutchPileActionTypes;

export const gameReducer = (state = initialGameState, action: combinedActions) => {
    switch (action.type) {
        case gameActions.INITIALIZE_GAME:
            return {
                ...state,
                ...action.payload,
                gameState: GameStates.LOBBY
            }
        case gameActions.SET_GAME_ID:
            return {
                ...state,
                gameId: action.payload
            }
        case gameActions.SET_GAME_LOBBY:
            return {
                ...state,
                gameState: GameStates.LOBBY
            };
        case gameActions.SET_GAME_ACTIVE:
            return {
                ...state,
                gameState: GameStates.ACTIVE
            };
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
        case dutchPileActions.ADD_ACTIVE_CARD_TO_DUTCH_PILE:

        case dutchPileActions.CREATE_DUTCH_PILE:
        case dutchPileActions.SET_ACTIVE_WOOD_CARD:
        case dutchPileActions.SET_ACTIVE_POST_CARD:
        case dutchPileActions.SET_ACTIVE_BLITZ_CARD:
        case dutchPileActions.CLEAR_ACTIVE_CARD:
        case dutchPileActions.UPDATE_DUTCH_PILES_FROM_FIREBASE:
        case dutchPileActions.SET_DUTCH_PILE_ACTION:
            return {
                ...state,
                dutchPiles: dutchPileReducer(state.dutchPiles, action)
            }
        default:
            return state;
    }
}

