import { PlayerNumber } from 'models/playerNumbers';
import { BlitzPileState } from 'store/blitzPile';
import { PostPileState } from 'store/postPile';
import { WoodPileState } from 'store/woodPile';

export interface Player {
    name: string;
    id: PlayerNumber;
    playerNumber: string
    startTime: number;
}

export interface HandState {
    blitzPile: BlitzPileState;
    postPile: PostPileState;
    woodPile: WoodPileState;
}

export interface PlayerState extends Player {
    hand: HandState;
}
