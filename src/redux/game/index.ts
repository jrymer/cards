import { PlayerImages } from 'models/card';
import { GameStatus } from 'models/games';
import { PlayerNumber } from 'models/playerNumbers';

export interface GameResponse {
    gameId: string;
    createdAt: number;
}

export type GameStateCurrentPlayerOmmitted = Omit<GameState, 'currentPlayer'>;
export interface GameState {
    currentPlayer: PlayerNumber;
    gameMetadata: GameResponse;
    gameStatus: GameStatus;
    round: number;
    playerImages: PlayerImages[];
}
