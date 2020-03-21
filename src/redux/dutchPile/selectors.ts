import { ActiveCard, DutchPiles, DutchPileState } from 'store/dutchPile';

import { State } from '../';

export const selectDutchPileState = (state: State): DutchPileState => state.dutchPile;
export const selectActiveDutchPiles = (state: State): DutchPiles => selectDutchPileState(state).activePiles;
export const selectActiveCard = (state: State): ActiveCard => selectDutchPileState(state).activeCard;
