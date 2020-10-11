import { Card } from 'models/card';
import { Piles } from 'models/piles';
import { PlayerNumber } from 'models/playerNumbers';

import { HandState, PlayerState } from '.';

export const SET_ACTIVE_WOOD_CARD = '[PLAYERS] SET_ACTIVE_WOOD_CARD';
export const SHUFFLE_WOOD_PILE = '[PLAYERS] SHUFFLE_WOOD_PILE';
export const REDRAW_WOOD_PILE = '[PLAYERS] REDRAW_WOOD_PILE';
export const REMOVE_TOP_CARD_FROM_WOOD_PILE = '[PLAYERS] REMOVE_TOP_CARD_FROM_WOOD_PILE';

export const SET_ACTIVE_POST_CARD = '[PLAYERS] SET_ACTIVE_POST_CARD';
export const ADD_TOP_BLITZ_TO_POST_PILE = '[PLAYERS] ADD_TOP_BLITZ_TO_POST_PILE';

export const SET_ACTIVE_BLITZ_CARD = '[PLAYERS] SET_ACTIVE_BLITZ_CARD';
export const NEW_BLITZ_TOP_CARD = '[PLAYERS] NEW_BLITZ_TOP_CARD';

export const CLEAR_ACTIVE_CARD = '[PLAYERS] CLEAR_ACTIVE_CARD';

export const SET_SCORE = '[PLAYERS] SET_SCORE';
export const UPDATE_PLAYERS = '[PLAYERS] UPDATE_PLAYERS';
export const INITIALIZE_HAND = '[PLAYERS] INITIALIZE_HAND'

interface UpdatePlayers {
    type: typeof UPDATE_PLAYERS;
    payload: {
        [key in PlayerNumber]: PlayerState;
    };
}

interface InitializeHand {
    type: typeof INITIALIZE_HAND;
    payload: {
        playerId: PlayerNumber;
        hand: HandState;
    };
}

interface SetActiveBlitzCard {
    type: typeof SET_ACTIVE_BLITZ_CARD;
    payload: {
        card: Card;
        pile: Piles;
        playerId: PlayerNumber;
    };
}

interface NewTopBlitzCardAction {
    type: typeof NEW_BLITZ_TOP_CARD;
    payload: { playerId: PlayerNumber };
}

interface SetActiveWoodCard {
    type: typeof SET_ACTIVE_WOOD_CARD;
    payload: {
        card: Card;
        pile: Piles;
        playerId: PlayerNumber;
    };
}

interface SetActivePostCard {
    type: typeof SET_ACTIVE_POST_CARD;
    payload: {
        card: Card;
        pile: Piles;
        playerId: PlayerNumber;
    };
}

interface TopBlitzToPostPileAction {
    type: typeof ADD_TOP_BLITZ_TO_POST_PILE;
    payload: { playerId: PlayerNumber };
}

interface SetScoreAction {
    type: typeof SET_SCORE;
    payload: {
        score: number;
        playerId: PlayerNumber;
    };
}

interface RedrawWoodPile {
    type: typeof REDRAW_WOOD_PILE;
    payload: { playerId: PlayerNumber };
}

interface RemoveTopCardFromWoodPile {
    type: typeof REMOVE_TOP_CARD_FROM_WOOD_PILE;
    payload: {
        card: Card;
        playerId: PlayerNumber;
    };
}

interface ShuffleWoodPile {
    type: typeof SHUFFLE_WOOD_PILE;
    payload: { playerId: PlayerNumber };
}

interface ClearActiveCard {
    type: typeof CLEAR_ACTIVE_CARD;
    payload: { playerId: PlayerNumber };
}

export const initializeHand = (playerId: PlayerNumber, hand: HandState): InitializeHand => ({
    type: INITIALIZE_HAND,
    payload: {
        playerId, hand
    }
});

export const updatePlayers = (players: { [key in PlayerNumber]: PlayerState }): UpdatePlayers => ({
    type: UPDATE_PLAYERS,
    payload: players
});

export const setActiveWoodCard = (card: Card, playerId: PlayerNumber): SetActiveWoodCard => {
    return {
        type: SET_ACTIVE_WOOD_CARD,
        payload: {
            card,
            pile: Piles.WOOD,
            playerId
        }
    };
};

export const shuffleWoodPile = (playerId: PlayerNumber): ShuffleWoodPile => {
    return {
        type: SHUFFLE_WOOD_PILE,
        payload: { playerId }
    }
};

export const removeTopCardFromWoodPile = (card: Card, playerId: PlayerNumber): RemoveTopCardFromWoodPile => {
    return {
        type: REMOVE_TOP_CARD_FROM_WOOD_PILE,
        payload: { card, playerId }
    }
};

export const setActivePostCard = (card: Card, playerId: PlayerNumber): SetActivePostCard => {
    return {
        type: SET_ACTIVE_POST_CARD,
        payload: {
            card,
            pile: Piles.POST,
            playerId
        }
    };
};
export const topBlitzCardToPostPile = (playerId: PlayerNumber): TopBlitzToPostPileAction => ({
    type: ADD_TOP_BLITZ_TO_POST_PILE,
    payload: { playerId }
}
);


export const redrawWoodPile = (playerId: PlayerNumber): RedrawWoodPile => {
    return {
        type: REDRAW_WOOD_PILE,
        payload: { playerId }
    }
};

export const setActiveBlitzCard = (card: Card, playerId: PlayerNumber): SetActiveBlitzCard => {
    return {
        type: SET_ACTIVE_BLITZ_CARD,
        payload: {
            card,
            pile: Piles.BLITZ,
            playerId
        }
    };
};

/**
 * Takes the blitz deck, removes a card from the deck, and returns that card as the new top card
 *
 * @returns {NewTopBlitzCardAction} A deck with a new top card
 */
export const newTopBlitzCard = (playerId: PlayerNumber): NewTopBlitzCardAction => ({
    type: NEW_BLITZ_TOP_CARD,
    payload: { playerId }
});

export const setScore = (score: number, playerId: PlayerNumber): SetScoreAction => ({
    type: SET_SCORE,
    payload: { playerId, score }
});

export const clearActiveCard = ( playerId: PlayerNumber): ClearActiveCard => ({
    type: CLEAR_ACTIVE_CARD,
    payload: {playerId}
});

export type PlayerActionTypes =
    | UpdatePlayers
    | InitializeHand
    | SetScoreAction

    | SetActiveBlitzCard
    | NewTopBlitzCardAction

    | SetActivePostCard
    | TopBlitzToPostPileAction

    | SetActiveWoodCard
    | RedrawWoodPile
    | ShuffleWoodPile
    | RemoveTopCardFromWoodPile

    | ClearActiveCard;
