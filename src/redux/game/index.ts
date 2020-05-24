import { GameStates } from 'models/games';
import { PlayerNumber } from 'models/playerNumbers';
import { DutchPileState } from 'store/dutchPile';
import { PlayerState } from 'store/players';

export interface GameScore {
    [key: string]: {
        name: string;
        score: number;
    };
}

export interface GameResponse {
    gameId: string;
    createdAt: number;
}

export interface GameState {
    activePlayers: PlayerNumber[];
    activeRound: number;
    dutchPiles: DutchPileState;
    gameId: string;
    gameState: GameStates;
    player: PlayerState;
    score: GameScore;
}
