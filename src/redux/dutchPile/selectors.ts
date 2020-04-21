import { DutchPileAction } from 'models/piles';
import { ActiveCard, DutchPiles, DutchPileState } from 'store/dutchPile';

import { State } from '../';

export const selectDutchPileState = (state: State): DutchPileState => state.game.dutchPiles;
export const selectActiveDutchPiles = (state: State): DutchPiles => selectDutchPileState(state).activePiles;
export const selectActiveCard = (state: State): ActiveCard => selectDutchPileState(state).activeCard;
export const selectDutchPileAction = (state: State): DutchPileAction => selectDutchPileState(state).action;
