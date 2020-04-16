import { Player } from 'store/players';


export const SET_CURRENT_PLAYER = '[PLAYERS] SET_CURRENT_PLAYER';

interface SetCurrentPlayerAction {
    type: typeof SET_CURRENT_PLAYER;
    payload: Player;
}

export const setCurrentPlayer = (player: Player): SetCurrentPlayerAction => ({
    type: SET_CURRENT_PLAYER,
    payload: player
});

export type PlayerActionTypes = SetCurrentPlayerAction;
