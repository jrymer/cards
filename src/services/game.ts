import db from 'services/firebase';

const createGame = async (): Promise<string> => {
    const gameRef = db.realtime.ref(`games`);
    const gameId = gameRef.push().key;

    await db.realtime.ref(`games/${gameId}`).update({
        createdAt: Date.now()
    });
    gameRef.onDisconnect().remove();

    return gameId;
}

export default {
    createGame
};