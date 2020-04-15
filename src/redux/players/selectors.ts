import { PlayerState } from '.';
import { State } from '../';

export const selectPlayerState = (state: State): PlayerState => state.players;
