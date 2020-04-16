import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import gameService from 'services/game';

import { initializeGame } from './actions';

export const createGame = () => async  (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState) => {
    const gameResponse = await gameService.createGame();
    const {gameId} = gameResponse;

    dispatch(initializeGame(gameResponse));
}