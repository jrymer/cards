import { Card } from 'models/card';
import { getColorNameValues, getTypeSafeColorName } from 'utils/cardFunctions';

/**
 * Shuffles the deck
 *
 * @param {Card[]} deck Deck to be shuffled
 * @returns {Card[]} Shuffled deck
 */
export const shuffleDeck = (deck: Card[]): Card[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

/**
 * Builds the initial deck of 40 cards and shuffles it.
 *
 * @returns {Card[]} Shuffled array of Card arrays
 */
export const buildDeck = (): Card[] => {
  const cardColors: string[] = getColorNameValues();
  const deck = cardColors.flatMap((color: string) => {
    const subDeck: Card[] = [];
    for (let i = 0; i < 10; i++) {
      const card: Card = { color: getTypeSafeColorName(color), cardValue: i + 1 };
      subDeck.push(card);
    }

    return subDeck;
  });

  return shuffleDeck(deck);
};
