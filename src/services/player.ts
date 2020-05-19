import { PlayerNumber } from 'models/playerNumbers';
import db from 'services/firebase';
import { Player } from 'store/players';

export const createPlayer = async (player: Player, gameId: string, activePlayers: PlayerNumber[]): Promise<Player> => {
    const activePlayersRef = db.realtime.ref(`games/${gameId}/activePlayers`);
    const playerRef = db.realtime.ref(`games/${gameId}/players/${player.id}`);
    // Add some validation to make sure player 1 is not already taken or something
    // await activePlayersRef.push(
    //     player.playerNumber
    // );
    await playerRef.update({
        ...player
    });

    return player;
}
