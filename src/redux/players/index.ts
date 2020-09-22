import { Card } from 'models/card';
import { Piles } from 'models/piles';
import { PlayerNumber } from 'models/playerNumbers';

export interface ScoreMap {
    playerNumber: PlayerNumber;
    score: number;
}

export interface Player {
    name: string;
    playerNumber: PlayerNumber;
    startTime: number;
    totalScore: number;
    roundScore: number;
    pointsFromDutchPile: number;
}

export interface ActiveCard {
  card: Card;
  pile: Piles;
}

export interface HandState {
    activeCard: ActiveCard;
    blitzPile: Card[];
    postPile: Card[];
    woodPile: Card[];
}

export interface PlayerState extends Player {
    hand: HandState;
}

