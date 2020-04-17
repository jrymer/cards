import { database } from 'firebase';
import Reference from 'firebase/firebase-database';
import db from 'services/firebase';
import { GameResponse } from 'store/game';

const createGame = async (): Promise<{newGame: Reference, gameResponse: GameResponse}> => {
    const gameRef = db.realtime.ref(`games`);
    const gameId = gameRef.push().key;
    const newGame = db.realtime.ref(`games/${gameId}`);

    await newGame.update({
        createdAt: Date.now()
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

const connectToGame = async (gameId: string): Reference => {
    console.log('connect to game');
    return db.realtime.ref(`games/${gameId}`);
}

export default {
    connectToGame,
    createGame
};
