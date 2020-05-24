import { ThunkDispatch } from 'redux-thunk'; import { AnyAction } from 'redux';
import { selectGameId } from 'store/game/selectors';
import { Piles, DutchPileAction } from 'models/piles';
import { newTopBlitzCard } from 'store/blitzPile/actions';
import { Card } from 'models/card';
import { topBlitzCardToPostPile } from 'store/postPile/actions';
import { removeCardFromWoodPile } from 'store/woodPile/actions';
import { clearActiveCard, createDutchPile, setDutchPileAction, addActiveCardToDutchPile } from './actions';
import { selectPostPile } from 'store/postPile/selectors';
import { selectTopCardFromBlitzDeck } from 'store/blitzPile/selectors';
import { ActiveCard } from '.';
import gameService from 'services/game';
import { selectPlayerState } from 'store/players/selectors';


export const validDutchPileClick = (activeCard: ActiveCard, dutchPileAction: DutchPileAction, dutchPileId?: string) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
    const gameId = selectGameId(getState());
    const postPileFromState = selectPostPile(getState());
    const player = selectPlayerState(getState());
    const topBlitzDeckCard = selectTopCardFromBlitzDeck(getState());
    const card: Card = activeCard?.card;

    if (dutchPileAction === DutchPileAction.ADD) {
        dispatch(addActiveCardToDutchPile(dutchPileId));
        await gameService.addCardToDutchPile(activeCard, dutchPileId, gameId, player.id);
    }

    dispatch(setDutchPileAction(dutchPileAction));
    switch (activeCard.pile) {
        case Piles.BLITZ:
            dispatch(newTopBlitzCard());
            break;
        case Piles.POST: {
            const newPostPile = postPileFromState.filter((postCards: Card): boolean => {
                return (postCards.cardValue !== card.cardValue) || (postCards.color !== card.color);
            });

            newPostPile.push(topBlitzDeckCard);
            dispatch(topBlitzCardToPostPile(newPostPile));
            dispatch(newTopBlitzCard());
            break;
        }
        case Piles.WOOD:
            dispatch(removeCardFromWoodPile(card));
            break;
    }

    if (dutchPileAction === DutchPileAction.CREATE) {
        const dutchPileId = await gameService.createDutchPile(gameId, activeCard, player.id);
        dispatch(createDutchPile(activeCard.card, dutchPileId));
    }

    dispatch(clearActiveCard());
}
