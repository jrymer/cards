import { ICard } from 'models/card';

// Stack of cards built to the right of a player, from cards held in that player's hand

export interface IWoodPileState {
  cardsRemaining: number,
  topCard: ICard
};
