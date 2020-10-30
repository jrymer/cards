import { Card, PlayerImages } from 'models/card';
import { Piles } from 'models/piles';
import { PlayerNumber } from 'models/playerNumbers';

export interface ScoreMap {
    playerNumber: PlayerNumber;
    totalScore: number;
    name: string;
    playerImage: PlayerImages;
}

export interface OpponentsHands {
    name: string;
    playerImage: PlayerImages;
    topBlitzCard: Card;
    postPile: Card[];
}

export interface Player {
    name: string;
    playerImage: PlayerImages;
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

