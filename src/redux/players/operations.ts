import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { createPlayer, resetHand } from 'services/player';
import { setCurrentPlayer } from 'store/game/actions';
import { selectCurrentPlayer } from 'store/game/selectors';
import { getHand } from 'utils/deckFunctions';
import { Player } from '.';
import { State } from '..';
import { updatePlayers } from './actions';


export const initializePlayer = (player: Player, gameId: string) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const hand = getHand();
    const players = await createPlayer(player, gameId, hand);
    dispatch(setCurrentPlayer(player.playerNumber));
    dispatch(updatePlayers(players));
};

export const resetPlayerHand = (gameId: string) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => State): Promise<void> => {
    const hand = getHand();
    const currentPlayerNumber = selectCurrentPlayer(getState());
    await resetHand(gameId, currentPlayerNumber, hand);
};