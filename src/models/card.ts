export enum CardColorValues {
  RED = '#ef4323',
  BLUE = '#00559f',
  GREEN = '#168F45',
  YELLOW = '#FAED24'
};

export enum CardColorNames {
  RED,
  BLUE,
  GREEN,
  YELLOW
}

export interface ICard {
  color: CardColorNames,
  cardValue: number
};

export const initialTopCard: ICard = {
  color: null,
  cardValue: 0
};
