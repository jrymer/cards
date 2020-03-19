import { CardColorNames, ICard } from 'models/card';

/**
 * Builds a random card with random number and color
 *
 * @returns {ICard} Card that was randomly genned
 */
export const cardRandomizer = (): ICard => ({
  cardValue: Math.floor(Math.random() * Math.floor(10)) + 1,
  color: randomColor()
});

/**
 * Returns the color names for the CardColorNames enums as a string array
 *
 * @returns {string[]} String array of CardColorNames names
 */
export const getColorNameValues = (): string[] => Object.keys(CardColorNames)
.filter(value => isNaN(Number(value)));

/**
 * Takes a string color, and returns the CardColorName value
 *
 * @param {string} color Name of the color as a string
 * @returns {CardColorNames} Name of the color as a CardColorNames
 */
export const getTypeSafeColorName = (color: string): CardColorNames => {
  switch (color) {
    case CardColorNames.RED:
      return CardColorNames.RED
    case CardColorNames.BLUE:
      return CardColorNames.BLUE
    case CardColorNames.GREEN:
      return CardColorNames.GREEN
    case CardColorNames.YELLOW:
      return CardColorNames.YELLOW
  };
};

/**
 * Gets a random color
 *
 * @returns {CardColorNames} The random color
 */
export const randomColor = (): CardColorNames => { 
  const enumValues = getColorNameValues();
  // Pick a random index based on the length of the array
  const randomIndex: number = Math.floor(Math.random() * enumValues.length);
  const randomValue = enumValues[randomIndex];
  // Doing this for type safety
  return getTypeSafeColorName(randomValue);
}