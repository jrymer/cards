export interface ICard {
  color: 'RED' | 'YELLOW' | 'BLUE' | 'GREEN',
  state: number
};

export const initialTopCard: ICard = {
  color: null,
  state: 0
};
