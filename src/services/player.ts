import { database } from 'firebase';
import { PlayerNumber } from 'models/playerNumbers';
import db from 'services/firebase';
import { HandState, Player, PlayerState } from 'store/players';

const getBaseRef = (gameId: string): string => `games/${gameId}`;
const getPlayersRef = (gameId: string): string => `${getBaseRef(gameId)}/players`;

export const createPlayer = async (player: Player, gameId: string, hand: HandState): Promise<{ [key in PlayerNumber]: PlayerState }> => {
    const playersRef = db.realtime.ref(getPlayersRef(gameId));
    // Add some validation to make sure player 1 is not already taken or something
    await playersRef.update({
        [player.playerNumber]: {
            ...player,
            hand
        }
    });

    const players = await playersRef.once('value').then((snapshot: database.DataSnapshot) => (
        snapshot.val().players
    ), (error: any) => {
        console.error(`Creating player failed: ${error}`);
    });

    return players;
}

export const updateRoundScore = async (gameId: string, playerId: PlayerNumber, roundScore: number, pointsFromDutchPile: number, hand: HandState): Promise<void> => {
    await db.realtime.ref(`${getPlayersRef(gameId)}/${playerId}`).update({
        pointsFromDutchPile,
        roundScore,
        hand
    });
}

// REFACTORE THE ROUND SCORE SO THAT FIREBASE IS UP TO DATE NOT JUST THE DUTCH CARD POINTS
export const updatePlayersAtEndRoundWithTotalScore = async (gameId: string, players: {
    [key in PlayerNumber]: PlayerState
}): Promise<void> => {
    await db.realtime.ref(getPlayersRef(gameId)).update({
        ...players
    });
}

export const resetHand = async (gameId: string, playerId: PlayerNumber, hand: HandState): Promise<void> => {
    await db.realtime.ref(`${getPlayersRef(gameId)}/${playerId}`).update({
        hand
    });
}