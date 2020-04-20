import { ActiveCard, DutchPiles, DutchPileState } from 'store/dutchPile';

import { State } from '../';

export const selectDutchPileState = (state: State): DutchPileState => state.game.dutchPiles;
export const selectActiveDutchPiles = (state: State): DutchPiles => selectDutchPileState(state).activePiles;
export const selectActiveCard = (state: State): ActiveCard => selectDutchPileState(state).activeCard;
