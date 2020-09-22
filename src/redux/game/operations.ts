import { database } from 'firebase';
import { PlayerNumber } from 'models/playerNumbers';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import gameService from 'services/game';
import { updatePlayersAtEndRoundWithTotalScore } from 'services/player';
import { resetDutchPiles, updateDutchPiles } from 'store/dutchPile/actions';
import { updatePlayers } from 'store/players/actions';
import { resetPlayerHand } from 'store/players/operations';
import { selectPlayerState } from 'store/players/selectors';

import { State } from '..';
import { updateGame } from './actions';
import { selectGameId, selectRound } from './selectors';

type thunkDispatch = ThunkDispatch<void, State, AnyAction>;

const handleGameUpdates = async (game: database.Reference, dispatch: thunkDispatch): Promise<void> => {
    await game
        .on('value', (snapshot: database.DataSnapshot): void => {
            const { dutchPiles, game, players } = snapshot.val();
            dispatch(updatePlayers(players));
            dispatch(updateGame(game));
            if (dutchPiles !== undefined) {
                dispatch(updateDutchPiles(dutchPiles));
            } else {
                dispatch(resetDutchPiles());
            }
        });
};

export const createGame = () => async (dispatch: thunkDispatch): Promise<void> => {
    const game = await gameService.createGame();
    handleGameUpdates(game, dispatch);
};

export const joinGame = (gameId: string) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const game = await gameService.connectToGame(gameId);
    handleGameUpdates(game, dispatch);
};

export const startGame = (gameId: string) => async (): Promise<void> => {
    await gameService.startGame(gameId);
};

export const endRound = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => State): Promise<void> => {
    const gameId = selectGameId(getState());
    const players = selectPlayerState(getState());
    Object.keys(players).forEach((playerId: PlayerNumber) => {
        const playerState = players[playerId];
        const {hand, pointsFromDutchPile, totalScore} =  playerState;
        const blitzPileDeduction = hand.blitzPile.length * 2;
        const roundScore = pointsFromDutchPile - blitzPileDeduction;
        players[playerId].roundScore = roundScore;
        players[playerId].totalScore = totalScore + roundScore;
    });
    await updatePlayersAtEndRoundWithTotalScore(gameId, players);
    await gameService.resetDutchPiles(gameId);
    await gameService.endRound(gameId);
};

export const startNewRound = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => State): Promise<void> => {
    const gameId = selectGameId(getState());
    const round = selectRound(getState());
    dispatch(resetPlayerHand(gameId));
    await gameService.startNewRound(gameId, round);
};
