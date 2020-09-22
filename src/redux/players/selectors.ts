import { Card } from 'models/card';
import { PlayerNumber } from 'models/playerNumbers';
import { selectCurrentPlayer } from 'store/game/selectors';

import { ActiveCard, HandState, PlayerState, ScoreMap } from '.';
import { State } from '../';

export const selectPlayerState = (state: State): {[key in PlayerNumber]: PlayerState} => state.players;
export const selectCurrentPlayerState = (state: State): PlayerState => {
    const currentPlayer = selectCurrentPlayer(state);
    const players = selectPlayerState(state);
    return players[currentPlayer];
}
export const selectActivePlayers = (state: State): PlayerNumber[] | null => {
    const playerState = selectPlayerState(state);
    if (!playerState) {
        return null;
    }
    return Object.keys(playerState).map((playerNumber: PlayerNumber) => playerNumber);
};

export const selectCurrentPlayerHand = (state: State): HandState => selectCurrentPlayerState(state).hand;
export const selectCurrentPlayerNumber = (state: State): PlayerNumber => selectCurrentPlayerState(state).playerNumber;
export const selectCurrentPlayerName = (state: State): string => selectCurrentPlayerState(state).name;
export const selectCurrentPlayerPointsFromDuthcPile = (state: State): number => selectCurrentPlayerState(state).pointsFromDutchPile;
export const selectCurrentPlayerRoundScore = (state: State): number => selectCurrentPlayerState(state).roundScore;
export const selectCurrentPlayerTotalScore = (state: State): number => selectCurrentPlayerState(state).totalScore;
export const selectActiveCard = (state: State): ActiveCard => selectCurrentPlayerHand(state).activeCard;
export const selectPlayersScoreMap = (state: State): ScoreMap[] => {
    const players = selectPlayerState(state);
    return Object.keys(players).map((playerNumber: PlayerNumber) => {
        return {playerNumber, score: players[playerNumber].totalScore }
    });
};

export const selectTopCardFromBlitzDeck = (state: State): Card => selectCurrentPlayerHand(state).blitzPile[0];
export const selectPostPile = (state: State): Card[] => selectCurrentPlayerHand(state).postPile;
export const selectTopCardFromWoodPile = (state: State): Card => selectCurrentPlayerHand(state).woodPile[0];
