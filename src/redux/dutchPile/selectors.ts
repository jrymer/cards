import { DutchPileState } from 'store/dutchPile';

import { State } from '../';

export const selectDutchPileState = (state: State): DutchPileState => state.dutchPiles;