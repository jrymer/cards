import { database } from 'firebase';
import { GameStates } from 'models/games';
import { DutchPileAction } from 'models/piles';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import gameService from 'services/game';
import { createDutchPile, updateDutchPilesFromFirebase } from 'store/dutchPile/actions';

import { initializeGame, setActivePlayers, setGameActive, setGameId, setGameLobby } from './actions';

export const createGame = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
    const { newGame: gameRef, gameResponse } = await gameService.createGame();

    gameRef.on('value', (snapshot: any) => {
        handleActivePlayers(snapshot.val(), dispatch);
        handleGameState(snapshot.val(), dispatch);
        handleDutchPileUpdates(snapshot.val(), dispatch)
    });

    dispatch(initializeGame(gameResponse));
}

export const joinGame = (gameId: string) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const gameRef = await gameService.connectToGame(gameId);
    gameRef.on('value', (snapshot: database.DataSnapshot) => {
        handleActivePlayers(snapshot.val(), dispatch);
        handleGameState(snapshot.val(), dispatch);
        handleDutchPileUpdates(snapshot.val(), dispatch)
    });
    dispatch(setGameLobby);
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

const handleGameState = (snapshot: any, dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const { status } = snapshot;
    if (status === GameStates.ACTIVE) {
        dispatch(setGameActive());
    }
}

const handleDutchPileUpdates = (snapshot: any, dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const snapshotKeys = Object.keys(snapshot);
    if (snapshotKeys.includes('updatedDutchPiles')) {
        const { updatedDutchPiles } = snapshot;
        const { dutchPileAction, dutchPileId, card } = updatedDutchPiles;
        
        switch (dutchPileAction) {
            case DutchPileAction.ADD:
                dispatch(updateDutchPilesFromFirebase(dutchPileId, card));
                break;
            case DutchPileAction.CREATE:
                dispatch(createDutchPile(card, dutchPileId));
                break;
        }
    } else {
        // do other stuff
    }
}
