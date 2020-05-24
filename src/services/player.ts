import db from 'services/firebase';
import { Player } from 'store/players';

export const createPlayer = async (player: Player, gameId: string): Promise<Player> => {
    const gameRef = db.realtime.ref(`games/${gameId}`);
    // Add some validation to make sure player 1 is not already taken or something
    await gameRef.child('players').update({
        [player.id]: {
            ...player
        }
    });
    await gameRef.child('score').update({
        [player.id]: {
            score: 0,
            name: player.name
        }
    });

    return player;
}
