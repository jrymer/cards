import Reference from 'firebase/firebase-database';
import db from 'services/firebase';
import { GameResponse } from 'store/game';

const createGame = async (): Promise<GameResponse> => {
    const gameRef = db.realtime.ref(`games`);
    const gameId = gameRef.push().key;
    const newGame = db.realtime.ref(`games/${gameId}`);

    await newGame.update({
        createdAt: Date.now()
    });

    gameRef.onDisconnect().remove();

    const createdAt = await newGame.once('value').then((snapshot) => {
        const { createdAt } = snapshot.val();
        return createdAt;
    }, (error: any) => {
        console.error(`Reading game failed: ${error}`)
    });

    return { gameId, createdAt };
}

const connectToGame = async (gameId: string): Reference => {
    return db.realtime.ref(`games/${gameId}`);
}

export default {
    connectToGame,
    createGame
};
