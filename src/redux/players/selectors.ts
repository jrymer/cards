import { Card, PlayerImages } from 'models/card';
import { PlayerNumber } from 'models/playerNumbers';
import { selectCurrentPlayer } from 'store/game/selectors';

import { ActiveCard, HandState, OpponentsHands, PlayerState, ScoreMap } from '.';
import { State } from '../';

export const selectPlayerState = (state: State): { [key in PlayerNumber]: PlayerState } => state.players;
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

export const selectCurrentPlayerImage = (state: State): PlayerImages => selectCurrentPlayerState(state).playerImage;
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
        const {totalScore, playerImage, name} = players[playerNumber];
        return {
            playerNumber,
            totalScore,
            playerImage,
            name
        }
    });
};
export const selectOpponentsHands = (state: State): OpponentsHands[] => {
    const playerState = selectPlayerState(state);
    const currentPlayer = selectCurrentPlayerNumber(state);
    return Object.keys(playerState)
        .filter((playerNumber: PlayerNumber) => (
            playerNumber !== currentPlayer
        ))
        .map((playerNameString: PlayerNumber) => {
            const { name, hand, playerImage } = playerState[playerNameString];
            return {
                name,
                playerImage,
                topBlitzCard: hand.blitzPile ? hand.blitzPile.slice(0, 1)[0] : undefined,
                postPile: hand.postPile
            }
        });
};
export const selectTopCardFromBlitzDeck = (state: State): Card | undefined => {
    const blitzDeck = selectCurrentPlayerHand(state).blitzPile;
    return blitzDeck && blitzDeck[0];
}
export const selectPostPile = (state: State): Card[] => {
    const postPile = selectCurrentPlayerHand(state).postPile;
    return postPile 
}
export const selectTopCardFromWoodPile = (state: State): Card | undefined => {
    const woodPile = selectCurrentPlayerHand(state).woodPile;
    return woodPile && woodPile[0];
}
