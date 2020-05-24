import { GameStates } from 'models/games';
import { DutchPileAction } from 'models/piles';
import { PlayerNumber } from 'models/playerNumbers';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import gameService from 'services/game';
import { initializeBlitzDeck } from 'store/blitzPile/actions';
import { DutchPiles, FirebaseDutchPile, UpdatedDutchPile } from 'store/dutchPile';
import { createDutchPile, resetDutchPiles, updateDutchPilesFromFirebase } from 'store/dutchPile/actions';
import { PlayerState } from 'store/players';
import { selectPlayerState } from 'store/players/selectors';
import { initializePostPile } from 'store/postPile/actions';
import { initializeWoodPile } from 'store/woodPile/actions';
import { buildDeck } from 'utils/deckFunctions';

import { GameScore } from '.';
import {
    bumpRoundNumber,
    initializeGame,
    setActivePlayers,
    setGameActive,
    setGameId,
    setGameLobby,
    setScore,
} from './actions';
import { selectGameId, selectGameScore } from './selectors';

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
    dispatch(bumpRoundNumber());
    dispatch(setGameActive());
};

export const endRound = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
    const gameId = selectGameId(getState());
    await gameService.endRound(gameId);
};

export const startNewRound = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
    const gameId = selectGameId(getState());

    dispatch(bumpRoundNumber());
    dispatch(initializeDecks());
    dispatch(setGameActive());

    await gameService.startNewRound(gameId);
};

export const initializeDecks = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const deck = buildDeck();
    const blitzDeck = deck.splice(0, 10);
    const postDeck = deck.splice(0, 3);

    dispatch(initializeBlitzDeck(blitzDeck));
    dispatch(initializePostPile(postDeck));
    dispatch(initializeWoodPile(deck));
}

const handleGameUpdates = async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    gameId: string,
    getState: any
) => {
    const playerRef = await gameService.connectToPlayers(gameId);
    const dutchPileRef = await gameService.connectToDutchPiles(gameId);
    const gameStatusRef = await gameService.connectToGameStatus(gameId);
    const scoreRef = await gameService.connectToScore(gameId);
    const gameRef = await gameService.connectToGame(gameId);

    let firebaseDutchPiles: DutchPiles;

    gameRef.on('value', (snapshot: any) => {
        const { dutchPiles } = snapshot.val();

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

    gameStatusRef.on('value', (snapshot: any) => {;
        const incomingGameState = snapshot.val();
        switch (incomingGameState) {
            case GameStates.NEW_ROUND_LOBBY:
                const playerState = selectPlayerState(getState());
                const score = selectGameScore(getState());
                dispatch(setGameLobby());
                dispatch(resetDutchPiles());
                handleNextRoundLobbyCreation(firebaseDutchPiles, gameId, playerState, score);
                break;
            case GameStates.ACTIVE:
                dispatch(setGameActive());
                break;
            default:
                break;
        }
    });

    scoreRef.on('value', (snapshot: any) => {
        handleScoreUpdates(snapshot.val(), dispatch);
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
    dutchPiles: DutchPiles,
    gameId: string,
    playerState: PlayerState,
    previousScore: GameScore
) => {
    const { hand, id, name } = playerState;
    const blitzDeckLength = hand.blitzPile?.blitzDeck.length;
    let roundScore = 0;

    Object.keys(dutchPiles).forEach((key: string) => {
        Object.values(dutchPiles[key]).forEach((dutchPile: FirebaseDutchPile) => {
            if (dutchPile.playerId === id) {
                roundScore++;
            }
        });
    });
    roundScore = (roundScore - (blitzDeckLength * 2)) + previousScore[id].score;
    gameService.updateScore(gameId, id, name, roundScore);
};

const handleScoreUpdates = (scoreMap: GameScore, dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(setScore(scoreMap));
}
