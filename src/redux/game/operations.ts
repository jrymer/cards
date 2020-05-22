import { GameStates } from 'models/games';
import { DutchPileAction } from 'models/piles';
import { PlayerNumber } from 'models/playerNumbers';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import gameService from 'services/game';
import { DutchPiles, FirebaseDutchPile, UpdatedDutchPile } from 'store/dutchPile';
import { createDutchPile, updateDutchPilesFromFirebase } from 'store/dutchPile/actions';
import { PlayerState } from 'store/players';
import { selectPlayerState } from 'store/players/selectors';

import { initializeGame, setActivePlayers, setGameActive, setGameId, setGameLobby, startNextRound } from './actions';
import { selectGameId } from './selectors';

export const createGame = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
    const { gameResponse } = await gameService.createGame();
    dispatch(setGameLobby());
    dispatch(initializeGame(gameResponse));
    handleGameUpdates(dispatch, gameResponse.gameId, getState);
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
    const gameRef = await gameService.connectToGame(gameId);

    let firebaseDutchPiles: DutchPiles;
    let firebasePlayers: PlayerState;

    gameRef.on('value', (snapshot: any) => {
        const { players, dutchPiles } = snapshot.val();
        if (players) {
            firebasePlayers = players;
        }
        if (dutchPiles) {
            firebaseDutchPiles = dutchPiles;
        }
    });
    playerRef.on('value', (snapshot: any) => {
        handlePlayers(snapshot.val(), dispatch);
    });

    dutchPileRef.on('value', (snapshot: any) => {
        handleDutchPileUpdates(snapshot.val(), dispatch);
    });


    gameStatusRef.on('value', (snapshot: any) => {
        const playerState = selectPlayerState(getState());
        const incomingGameState = snapshot.val();
        switch (incomingGameState) {
            case GameStates.NEW_ROUND_LOBBY:
                dispatch(setGameLobby());
                const activePlayers = Object.keys(firebasePlayers);
                handleNextRoundLobbyCreation(activePlayers as PlayerNumber[], firebaseDutchPiles, dispatch, gameId, playerState);
                break;
            case GameStates.ACTIVE:
                dispatch(setGameActive());
                break;
            default:
                break;
        }
    });
}


const handlePlayers = (snapshot: any, dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    if (snapshot) {
        const activePlayers = Object.keys(snapshot);
        dispatch(setActivePlayers(activePlayers as PlayerNumber[]));
    }
}

const handleDutchPileUpdates = (dutchPiles: UpdatedDutchPile, dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    if (dutchPiles) {
        const { dutchPileAction, dutchPileId, card } = dutchPiles;

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
    let score = 0;
    // const playerMap: GameScore = {};
    // activePlayers.forEach((playerId: PlayerNumber) => {
    //     playerMap[playerId] = 0;
    // })

    Object.keys(dutchPiles).forEach((key: string) => {
        Object.values(dutchPiles[key]).forEach((dutchPile: FirebaseDutchPile) => {
            if (dutchPile.playerId === id) {
                score++;
            }
        });
    });
    score = score - (blitzDeckLength * 2);
    console.log(score, 'after')
    // dispatch(setScore(playerMap));
    gameService.updateScore(gameId, id, score);
};
