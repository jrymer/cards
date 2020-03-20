import { Card } from 'models/card';

// This pile of 10 cards is the most important pile of cards to each player since it
// is the key towards "Blitzing" the other players when all cards have been used up. If the
// player is left-handed, the pile can be placed to his left for easier handling of the cards.

export interface BlitzPileState {
  blitzDeck: Card[];
}
