import { Card } from 'models/card';
import { Piles } from 'models/piles';

// Stacks of cards in each of the four colors - 1 through 10 an ASCENDING
// sequence - placed in the center of the table and played upon by all players. Each player
// accumulates scoring points here. 

export interface DutchPiles {
  [key: string]: DutchPile;
}
export interface DutchPile {
  [key: number]: Card;
}
export interface ActiveCard {
  card: Card;
  pile: Piles;
}
export interface DutchPileState {
  activeCard: ActiveCard;
  activePiles: DutchPiles;
  completedPiles: DutchPiles;
}
