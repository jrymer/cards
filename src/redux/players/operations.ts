import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createPlayer } from 'services/player';
import { initializeDecks } from 'store/game/operations';

import { Player } from '.';
import { setCurrentPlayer } from './actions';

export const initializePlayer = (player: Player, gameId: string) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const createdPlayer = await createPlayer(player, gameId);
    
    dispatch(setCurrentPlayer(createdPlayer));
    dispatch(initializeDecks());
};
