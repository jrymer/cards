import { Card } from 'models/card';
import { WoodPileState } from 'store/woodPile';

import { State } from '../';

export const selectWoodPileState = (state: State): WoodPileState => state.game.player.hand.woodPile;
export const selectWoodPile = (state: State): Card[] => selectWoodPileState(state).woodPile;
export const selectTopCardFromWoodPile = (state: State): Card => selectWoodPileState(state).woodPile[0];
