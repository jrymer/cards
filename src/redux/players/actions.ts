import { Player } from 'store/players';


export const ADD_PLAYER = '[PLAYERS] ADD_PLAYER';

interface AddPlayerAction {
    type: typeof ADD_PLAYER;
    payload: {
        gameId: string;
        player: Player;
    };
}

export const addPlayer = (player: Player, gameId: string): AddPlayerAction => ({
    type: ADD_PLAYER,
    payload: {
        gameId,
        player
    }
});

export type PlayerActionTypes = AddPlayerAction;
