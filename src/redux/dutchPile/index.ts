import { Card } from 'models/card';
import { DutchPileAction, Piles } from 'models/piles';
import { PlayerNumber } from 'models/playerNumbers';

// Stacks of cards in each of the four colors - 1 through 10 an ASCENDING
// sequence - placed in the center of the table and played upon by all players. Each player
// accumulates scoring points here. 

export interface DutchPiles {
  [key: string]: DutchPile | FirebaseDutchPile;
}
export interface DutchPile {
  [key: number]: Card;
}
export interface FirebaseDutchPile extends DutchPile{
  playerId: PlayerNumber;
}
export interface UpdatedDutchPile {
  card: Card;
  dutchPileAction: DutchPileAction;
  dutchPileId: string;
}
export interface ActiveCard {
  card: Card;
  pile: Piles;
}
export interface DutchPileState {
  action: DutchPileAction;
  activeCard: ActiveCard;
  activePiles: DutchPiles;
  completedPiles: DutchPiles;
}
