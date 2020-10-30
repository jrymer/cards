import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { createPlayer, resetHand, updateWoodPile } from 'services/player';
import { setCurrentPlayer } from 'store/game/actions';
import { selectCurrentPlayer, selectGameId } from 'store/game/selectors';
import { getHand } from 'utils/deckFunctions';
import { Player } from '.';
import { State } from '..';
import * as playerActions from './actions';
import { PlayerNumber } from 'models/playerNumbers';
import { selectCurrentPlayerHand } from './selectors';


export const initializePlayer = (player: Player, gameId: string) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(playerActions.initializePlayer);
    const hand = getHand();
    const players = await createPlayer(player, gameId, hand);
    dispatch(setCurrentPlayer(player.playerNumber));
    dispatch(playerActions.updatePlayers(players));
};

export const resetPlayerHand = (gameId: string) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => State): Promise<void> => {
    dispatch(playerActions.resetPlayerHand);
    const hand = getHand();
    const currentPlayerNumber = selectCurrentPlayer(getState());
    await resetHand(gameId, currentPlayerNumber, hand);
};

export const updateTopWoodCard = (playerNumber: PlayerNumber) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => State): Promise<void> => {
    dispatch(playerActions.redrawWoodPile);
    const gameId = selectGameId(getState());
    const woodPile = selectCurrentPlayerHand(getState()).woodPile;
    const topThree = woodPile.slice(0, 3);
    const rest = woodPile.slice(3);
    const topThreeToBack = rest.concat(topThree);
    await updateWoodPile(gameId, playerNumber, topThreeToBack);

};

export const updateWoodPileFromShuffle = (playerNumber: PlayerNumber) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => State): Promise<void> => {
    dispatch(playerActions.shuffleWoodPile);
    const gameId = selectGameId(getState());
    const woodPileFromState = selectCurrentPlayerHand(getState()).woodPile;
    const shuffledWoodPile =  [...woodPileFromState.slice(1).concat(woodPileFromState.slice(0, 1))]

    await updateWoodPile(gameId, playerNumber, shuffledWoodPile);

};