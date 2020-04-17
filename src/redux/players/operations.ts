import { PlayerNumber } from 'models/playerNumbers';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createPlayer } from 'services/player';
import { initializeBlitzDeck } from 'store/blitzPile/actions';
import { initializePostPile } from 'store/postPile/actions';
import { initializeWoodPile } from 'store/woodPile/actions';
import { buildDeck } from 'utils/deckFunctions';

import { Player } from '.';
import { setCurrentPlayer } from './actions';

export const initializePlayer = (player: Player, gameId: string, activePlayers: PlayerNumber[]) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const createdPlayer = await createPlayer(player, gameId, activePlayers);
    
    const deck = buildDeck();
    const blitzDeck = deck.splice(0, 10);
    const postDeck = deck.splice(0, 3);

    dispatch(setCurrentPlayer(createdPlayer));
    dispatch(initializeBlitzDeck(blitzDeck));
    dispatch(initializePostPile(postDeck));
    dispatch(initializeWoodPile(deck));
};
