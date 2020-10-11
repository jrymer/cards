export enum CardColorValues {
  RED = '#ef4323',
  BLUE = '#00559f',
  GREEN = '#168F45',
  YELLOW = '#FAED24'
}

export enum CardColorNames {
  RED = 'RED',
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  YELLOW = 'YELLOW'
}

export enum PlayerImages {
  BUTTER = 'butter',
  PLOUGH = 'plough',
  SPICKET = 'spicket',
  BUCKET = 'bucket',
  BUGGY = 'buggy',
  BASKET = 'basket',
  BEER = 'beer',
  COW = 'cow',
  WINDMILL = 'windmill',
  WHEAT = 'wheat'
  
}

export interface Card {
  color: CardColorNames;
  cardValue: number;
}
