import { Card } from 'models/card';
import { PostPileState } from 'store/postPile';

import { State } from '../';

export const selectPostPileState = (state: State): PostPileState => state.game.player.hand.postPile;
export const selectPostPile = (state: State): Card[] => selectPostPileState(state).availableCards;
