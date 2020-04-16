import db from 'services/firebase';
import { Player } from 'store/players';

export const createPlayer = async (player: Player, gameId: string): Promise<Player> => {
    const gameRef = db.realtime.ref(`games/${gameId}/players`);

    // Add some validation to make sure player 1 is not already taken or something
    await gameRef.update({
        [player.id]: {
            ...player
        }
    });
    // getActivePlayers(gameId);
    return player;
}
