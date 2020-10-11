import { DutchPileState } from '.';

export const UPDATE_DUTCH_PILES = '[DUTCH] UPDATE_DUTCH_PILES';
export const RESET_DUTCH_PILES = '[DUTCH] RESET_DUTCH_PILES';

interface UpdateDutchPiles {
  type: typeof UPDATE_DUTCH_PILES;
  payload: DutchPileState;
}

interface ResetDutchPiles {
  type: typeof RESET_DUTCH_PILES;
}

export const updateDutchPiles = (dutchPiles: DutchPileState): UpdateDutchPiles => ({
  type: UPDATE_DUTCH_PILES,
  payload: dutchPiles
});

export const resetDutchPiles = (): ResetDutchPiles => ({type: RESET_DUTCH_PILES});

export type DutchPileActionTypes =
  | UpdateDutchPiles
  | ResetDutchPiles;
