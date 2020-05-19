import { GameStates } from 'models/games';
import { DutchPileAction } from 'models/piles';
import { PlayerNumber } from 'models/playerNumbers';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import gameService from 'services/game';
import { DutchPiles, FirebaseDutchPile } from 'store/dutchPile';
import { createDutchPile, updateDutchPilesFromFirebase } from 'store/dutchPile/actions';
import { PlayerState } from 'store/players';
import { selectPlayerState } from 'store/players/selectors';

import { GameScore } from '.';
import {
    initializeGame,
    setActivePlayers,
    setGameActive,
    setGameId,
    setGameLobby,
    setScore,
    startNextRound,
} from './actions';
import { selectGameId } from './selectors';

export const createGame = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
    const { gameResponse } = await gameService.createGame();

    handleGameUpdates(dispatch, gameResponse.gameId, getState);

    dispatch(initializeGame(gameResponse));
}

export const joinGame = (gameId: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
    handleGameUpdates(dispatch, gameId, getState);

    dispatch(setGameLobby);
    dispatch(setGameId(gameId));
};

export const startGame = (gameId: string) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    await gameService.startGame(gameId);
    dispatch(startNextRound());
    dispatch(setGameActive());
};

export const endRound = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
    const gameId = selectGameId(getState());
    await gameService.endRound(gameId);
};

export const nextRound = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
    // tell firestore to start next round
    dispatch(startNextRound());
    dispatch(setGameActive());
}

const handleGameUpdates = async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    gameId: string,
    getState: any
) => {
    const playerRef = await gameService.connectToPlayers(gameId);
    const dutchPileRef = await gameService.connectToDutchPiles(gameId);
    const gameStatusRef = await gameService.connectToGameStatus(gameId);

    // let dutchPilesCreated = false;
    // let activePlayersCreated = false;

    // gameRef.on('value', (snapshot: any) => {
    //     console.log(snapshot.val());
    //     const { updatedDutchPiles, activePlayers } = snapshot.val();
    //     if (updatedDutchPiles) {
    //         dutchPilesCreated = true;
    //     }
    //     if (activePlayers) {
    //         activePlayersCreated = true;
    //     }
    // });

    // if (activePlayersCreated) {
        playerRef.on('value', (snapshot: any) => {
            console.log('ACTIVE PLAYER CHANGE');
            handlePlayers(snapshot.val(), dispatch);
        });
    // }
    // if (dutchPilesCreated) {
        dutchPileRef.on('value', (snapshot: any) => {
            console.log('DUTCH PILE CHANGE');
            handleDutchPileUpdates(snapshot.val(), dispatch);
        });
    // }

    gameStatusRef.on('value', (snapshot: any) => {
        console.log('GAME STATUS CHANGE');
        const playerState = selectPlayerState(getState());
        const status = snapshot.val();
        switch (status) {
            case GameStates.NEW_ROUND_LOBBY:
                dispatch(setGameLobby());
                const { activePlayers, dutchPiles } = snapshot.val();
                handleNextRoundLobbyCreation(activePlayers, dutchPiles, dispatch, gameId, playerState);
                break;
            case GameStates.ACTIVE:
                dispatch(setGameActive());
                break;
            default:
                break;
        }
    });

    // gameRef.on('value', (snapshot: any) => {
    // handlePlayers(snapshot.val(), dispatch);
    // handleGameState(snapshot.val(), dispatch);
    // handleDutchPileUpdates(snapshot.val(), dispatch);
    // if (status === GameStates.NEW_ROUND_LOBBY) {
    //     dispatch(setGameLobby());
    //     const { activePlayers, dutchPiles } = snapshot.val();
    //     handleNextRoundLobbyCreation(activePlayers, dutchPiles, dispatch, gameId, playerState);
    // }
    // });
}


const handlePlayers = (snapshot: any, dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    console.log(snapshot, 'snapshot')
    if (snapshot) {
        const activePlayers = Object.keys(snapshot);
        dispatch(setActivePlayers(activePlayers as PlayerNumber[]));
    }
}

// const handleGameState = (snapshot: any, dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
//     const { status } = snapshot;
//     if (status === GameStates.ACTIVE) {
//         dispatch(setGameActive());
//     }
// }

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

const handleNextRoundLobbyCreation = (
    activePlayers: PlayerNumber[],
    dutchPiles: DutchPiles,
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    gameId: string,
    playerState: PlayerState
) => {
    console.log(gameId, 'game id to update the score with')
    const { hand, id } = playerState;
    const blitzDeckLength = hand.blitzPile?.blitzDeck.length;
    const playerMap: GameScore = {};
    activePlayers.forEach((playerId: PlayerNumber) => {
        playerMap[playerId] = 0;
    })

    Object.keys(dutchPiles).forEach((key: string) => {
        Object.values(dutchPiles[key]).forEach((dutchPile: FirebaseDutchPile) => {
            playerMap[dutchPile.playerId]++
        });
    });
    playerMap[id] = playerMap[id] - (blitzDeckLength * 2);
    console.log(playerMap, 'after')
    dispatch(setScore(playerMap));
    // gameService.updateScore(gameId, playerMap);
};
