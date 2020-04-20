import { GameStates } from 'models/games';
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
    gameState: GameStates;
    player: PlayerState;
    dutchPiles: DutchPileState;
}
