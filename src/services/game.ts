import { database } from 'firebase';
import { GameStates } from 'models/games';
import { DutchPileAction } from 'models/piles';
import { PlayerNumber } from 'models/playerNumbers';
import db from 'services/firebase';
import { ActiveCard } from 'store/dutchPile';
import { GameResponse } from 'store/game';

const createGame = async (): Promise<{ newGame: database.Reference, gameResponse: GameResponse }> => {
    const gameRef = db.realtime.ref(`games`);
    const gameId = gameRef.push().key;
    const newGame = db.realtime.ref(`games/${gameId}`);

    await newGame.update({
        createdAt: Date.now(),
        players: false,
        status: GameStates.LOBBY,
        updatedDutchPiles: false
    });

    gameRef.onDisconnect().remove();

    const createdAt = await newGame.once('value').then((snapshot: database.DataSnapshot) => {
        const { createdAt } = snapshot.val();
        return createdAt;
    }, (error: any) => {
        console.error(`Reading game failed: ${error}`)
    });
    const gameResponse: GameResponse = { gameId, createdAt };
    return { newGame, gameResponse };
}

const connectToGame = async (gameId: string): Promise<database.Reference> => {
    return db.realtime.ref(`games/${gameId}`);
}
const connectToPlayers = async (gameId: string): Promise<database.Reference> => {
    return db.realtime.ref(`games/${gameId}/players`);
}
const connectToDutchPiles = async (gameId: string): Promise<database.Reference> => {
    return db.realtime.ref(`games/${gameId}/updatedDutchPiles`);
}
const connectToGameStatus = async (gameId: string): Promise<database.Reference> => {
    return db.realtime.ref(`games/${gameId}/status`);
}
const connectToScore = async (gameId: string): Promise<database.Reference> => {
    return db.realtime.ref(`games/${gameId}/score`);
}
const startGame = async (gameId: string): Promise<database.Reference> => {
    return await db.realtime.ref(`games/${gameId}`).update({
        createdAt: Date.now(),
        status: GameStates.ACTIVE,
        round: 1
    });
}

const endGame = async (gameId: string): Promise<void> => {

}

const endRound = async (gameId: string): Promise<void> => {
    await db.realtime.ref(`games/${gameId}`).update({
        status: GameStates.NEW_ROUND_LOBBY
    });
}

const updateScore = async (gameId: string, playerId: PlayerNumber, score: number): Promise<void> => {
    await db.realtime.ref(`games/${gameId}`).child('score').update({
        [playerId]: score
    });
}

const addCardToDutchPile = async (card: ActiveCard, dutchPileId: string, gameId: string, playerId: PlayerNumber) => {
    const dutchPileRef = db.realtime.ref(`games/${gameId}/dutchPiles/${dutchPileId}`);
    await dutchPileRef.push({
        ...card.card,
        playerId
    });
    await db.realtime.ref(`games/${gameId}`).update({
        updatedDutchPiles: {
            card: card.card,
            dutchPileAction: DutchPileAction.ADD,
            dutchPileId,
        }
    })
};

const createDutchPile = async (gameId: string, card: ActiveCard, playerId: PlayerNumber) => {
    const dutchPilesRef = db.realtime.ref(`games/${gameId}/dutchPiles`);
    const dutchPileId = dutchPilesRef.push().key;
    const newDutchPileRef = db.realtime.ref(`games/${gameId}/dutchPiles/${dutchPileId}`);
    await newDutchPileRef.push({
        ...card.card,
        playerId
    });
    await db.realtime.ref(`games/${gameId}`).update({
        updatedDutchPiles: {
            card: card.card,
            dutchPileAction: DutchPileAction.CREATE,
            dutchPileId: dutchPileId
        }
    });

    return dutchPileId;
}

export default {
    addCardToDutchPile,
    createDutchPile,
    connectToPlayers,
    connectToDutchPiles,
    connectToGame,
    connectToGameStatus,
    connectToScore,
    createGame,
    endGame,
    endRound,
    startGame,
    updateScore
};
