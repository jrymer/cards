import { PlayerNumber } from 'models/playerNumbers';
import db from 'services/firebase';
import { Player } from 'store/players';

export const createPlayer = async (player: Player, gameId: string, activePlayers: PlayerNumber[]): Promise<Player> => {
    const gameRef = db.realtime.ref(`games/${gameId}`);

    // Add some validation to make sure player 1 is not already taken or something
    await gameRef.update({
        activePlayers: [...activePlayers, player.playerNumber],
        players: {
            [player.id]: {
                ...player
            }
        }
    });
    // getActivePlayers(gameId);
    return player;
}
