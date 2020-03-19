import { ICard } from '../card';

// Stacks of cards in each of the four colors - 1 through 10 an ASCENDING
// sequence - placed in the center of the table and played upon by all players. Each player
// accumulates scoring points here. 

export interface IDutchPileState extends ICard {
  active: boolean
};