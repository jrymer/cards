import { PlayerNumber } from 'models/playerNumbers';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as dutchPileActions from 'store/dutchPile/actions';
import * as gameActions from 'store/game/actions';
import * as playerActions from 'store/players/actions';

import { DutchPileState } from './dutchPile';
import { dutchPileReducer } from './dutchPile/reducer';
import { GameState } from './game';
import { gameReducer, initialGameState } from './game/reducer';
import { PlayerState } from './players';
import { playerReducer } from './players/reducer';

export interface State {
  dutchPiles: DutchPileState;
  game: GameState;
  players: {
    [key in PlayerNumber]: PlayerState;
  };
}

const initialRootState: State = {
  dutchPiles: null,
  game: initialGameState,
  players: null
  // [Players.PLAYER_ONE]: initialPlayerState,
  // [Players.PLAYER_TWO]: initialPlayerState,
  // [Players.PLAYER_THREE]: initialPlayerState,
  // [Players.PLAYER_FOUR]: initialPlayerState
};

type combinedActions =
  | gameActions.GameActionTypes
  | playerActions.PlayerActionTypes
  | dutchPileActions.DutchPileActionTypes;

const middlewares = [thunk];

const rootReducer = (state = initialRootState, action: combinedActions): State => {
  switch (action.type) {
    case gameActions.INITIALIZE_GAME:
    case gameActions.BUMP_ROUND:
    case gameActions.SET_GAME_ID:
    case gameActions.SET_GAME_NEXT_ROUND_LOBBY:
    case gameActions.SET_GAME_LOBBY:
    case gameActions.SET_GAME_ACTIVE:
    case gameActions.SET_CURRENT_PLAYER:
    case gameActions.UPDATE_GAME:
      return {
        ...state,
        game: gameReducer(state.game, action)
      }
    case playerActions.SET_ACTIVE_WOOD_CARD:
    case playerActions.SHUFFLE_WOOD_PILE:
    case playerActions.REDRAW_WOOD_PILE:
    case playerActions.REMOVE_TOP_CARD_FROM_WOOD_PILE:
    case playerActions.SET_ACTIVE_POST_CARD:
    case playerActions.ADD_TOP_BLITZ_TO_POST_PILE:
    case playerActions.SET_ACTIVE_BLITZ_CARD:
    case playerActions.NEW_BLITZ_TOP_CARD:
    case playerActions.CLEAR_ACTIVE_CARD:
    case playerActions.SET_SCORE:
    case playerActions.INITIALIZE_HAND: {
      return {
        ...state,
        players: {
          ...state.players,
          [action.payload.playerId]: playerReducer(state.players[action.payload.playerId], action)
        }
      }
    }
    case playerActions.UPDATE_PLAYERS: {
      return {
        ...state,
        players: {
          ...state.players,
          ...action.payload
        }
      }
    }
    case dutchPileActions.UPDATE_DUTCH_PILES:
    case dutchPileActions.RESET_DUTCH_PILES:
      return {
        ...state,
        dutchPiles: dutchPileReducer(state.dutchPiles, action)
      }
    default:
      return state;
  }
};


export const store = createStore(
  rootReducer,
  initialRootState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export type AppState = ReturnType<typeof rootReducer>;
