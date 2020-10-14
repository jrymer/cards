import { Card, PlayerImages } from 'models/card';
import { PlayerNumber } from 'models/playerNumbers';

// Stacks of cards in each of the four colors - 1 through 10 an ASCENDING
// sequence - placed in the center of the table and played upon by all players. Each player
// accumulates scoring points here. 


export interface DutchPileCard extends Card {
  playerNumber: PlayerNumber;
  playerImage: PlayerImages;
}
export interface DutchPiles {
  [dutchPileId: string]: DutchPileCard;
}
export interface DutchPileState {
  [dutchPileId: string]: DutchPiles;
}
