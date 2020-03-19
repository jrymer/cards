import { ICard } from 'models/card';
import { getColorNameValues, getTypeSafeColorName } from 'utils/cardFunctions';

/**
 * Builds the initial deck of 40 cards and shuffles it.
 *
 * @returns {ICard[]} Shuffled array of ICard arrays
 */
export const buildDeck = (): ICard[] => {
  const cardColors: string[] = getColorNameValues();
  const deck = cardColors.flatMap((color: string) => {
    const subDeck: ICard[] = [];
    for (let i = 0; i < 10; i++) {
      const card: ICard = { color: getTypeSafeColorName(color), cardValue: i + 1 };
      subDeck.push(card);
    }

    return subDeck;
  });

  return shuffleDeck(deck);
};

/**
 * Shuffles the deck
 *
 * @param {ICard[]} deck Deck to be shuffled
 * @returns {ICard[]} Shuffled deck
 */
export const shuffleDeck = (deck: ICard[]): ICard[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};
