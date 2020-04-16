import { PlayerNumber } from 'models/playerNumbers';
import { DutchPileState } from 'store/dutchPile';
import { PlayerState } from 'store/players';

export interface GameResponse {
    gameId: string;
    createdAt: number;
}

export interface GameState {
    activePlayers: PlayerNumber[];
    gameId: string;
    player: PlayerState;
    dutchPiles: DutchPileState;
}
