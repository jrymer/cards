import { Card } from 'models/card';
import { BlitzPileState } from 'store/blitzPile/';

import { State } from '../';

export const selectBlitzPileState = (state: State): BlitzPileState => state.blitzPile;
export const selectBlitzDeck = (state: State): Card[] => selectBlitzPileState(state).blitzDeck;
export const selectTopCardFromBlitzDeck = (state: State): Card => selectBlitzPileState(state).blitzDeck[0];
