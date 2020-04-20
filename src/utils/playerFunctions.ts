import { PlayerNumber } from 'models/playerNumbers';

export const getIndexOfPlayerNumber = (playerName: PlayerNumber): number => {
    const keys = Object.keys(PlayerNumber);
    return keys.indexOf(playerName);
}
