import { ICard } from 'store/card';

// Groups of cards placed to the left of both the Blitz and Wood piles in
// DESCENDING sequence For each player, the Post Piles serve as a "trading" or
// replacement area during the game.

export interface IPostPileState {
  availableCards: ICard[];
};
