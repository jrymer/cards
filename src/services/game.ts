import { database } from 'firebase';
import { GameStates } from 'models/games';
import { DutchPileAction } from 'models/piles';
import db from 'services/firebase';
import { ActiveCard } from 'store/dutchPile';
import { GameResponse } from 'store/game';

const createGame = async (): Promise<{ newGame: database.Reference, gameResponse: GameResponse }> => {
    const gameRef = db.realtime.ref(`games`);
    const gameId = gameRef.push().key;
    const newGame = db.realtime.ref(`games/${gameId}`);

    await newGame.update({
        createdAt: Date.now(),
        status: GameStates.LOBBY
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

const startGame = async (gameId: string): Promise<database.Reference> => {
    return await db.realtime.ref(`games/${gameId}`).update({
        createdAt: Date.now(),
        status: GameStates.ACTIVE
    });
}

const addCardToDutchPile = async (card: ActiveCard, dutchPileId: string, gameId: string) => {
    const dutchPileRef = db.realtime.ref(`games/${gameId}/dutchPiles/${dutchPileId}`);
    await dutchPileRef.update({
        ...card.card
    });
    await db.realtime.ref(`games/${gameId}`).update({
        updatedDutchPiles: {
            card: card.card,
            dutchPileAction: DutchPileAction.ADD,
            dutchPileId,
        }
    })
};

const createDutchPile = async (gameId: string, card: ActiveCard) => {
    const dutchPilesRef = db.realtime.ref(`games/${gameId}/dutchPiles`);
    const dutchPileId = dutchPilesRef.push().key;
    const newDutchPileRef = db.realtime.ref(`games/${gameId}/dutchPiles/${dutchPileId}`);
    await newDutchPileRef.update({
        ...card.card
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
    connectToGame,
    createGame,
    startGame
};
