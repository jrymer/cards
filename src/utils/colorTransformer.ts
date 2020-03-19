import { CardColorNames, CardColorValues } from 'models/card';

/**
 * Takes a string name of the color like RED and returns its hex value
 *
 * @param {CardColorNames} color The string name of the color
 * @returns {CardColorValues} The hex color value of the color
 */
export const colorTransformer = (color: CardColorNames): CardColorValues => {
  switch(color) {
    case CardColorNames.BLUE:
      return CardColorValues.BLUE;
    case CardColorNames.GREEN:
      return CardColorValues.GREEN;
    case CardColorNames.RED:
      return CardColorValues.RED;
    case CardColorNames.YELLOW:
      return CardColorValues.YELLOW;
  }
};
