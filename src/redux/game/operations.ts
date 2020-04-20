import { database } from 'firebase';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import gameService from 'services/game';

import { initializeGame, setActivePlayers, setGameActive, setGameId } from './actions';

export const createGame = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const { newGame: gameRef, gameResponse } = await gameService.createGame();

    gameRef.on('value', (snapshot: any) => {
        handleActivePlayers(snapshot.val(), dispatch);
    })

    dispatch(initializeGame(gameResponse));
}

export const joinGame = (gameId: string) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const gameRef = await gameService.connectToGame(gameId);
    gameRef.on('value', (snapshot: database.DataSnapshot) => {
        handleActivePlayers(snapshot.val(), dispatch);
    })
    dispatch(setGameId(gameId));
};

export const startGame = (gameId: string) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    await gameService.startGame(gameId);
    dispatch(setGameActive());
};

const handleActivePlayers = (snapshot: any, dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const snapshotKeys = Object.keys(snapshot);
    if (snapshotKeys.includes('activePlayers')) {
        const { activePlayers } = snapshot;
        dispatch(setActivePlayers(activePlayers));
    } else {
        // do other stuff
    }
}
