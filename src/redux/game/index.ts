import { DutchPileState } from 'store/dutchPile';
import { PlayerState } from 'store/players';

export interface GameState {
    [key: string]: {
        players: PlayerState;
        dutchPiles: DutchPileState;
    }
}
