import { ThunkDispatch } from 'redux-thunk'; import { AnyAction } from 'redux';
import { selectGameId } from 'store/game/selectors';
import { Piles, DutchPileAction } from 'models/piles';
import { newTopBlitzCard } from 'store/blitzPile/actions';
import { Card } from 'models/card';
import { topBlitzCardToPostPile } from 'store/postPile/actions';
import { removeCardFromWoodPile } from 'store/woodPile/actions';
import { clearActiveCard, createDutchPile } from './actions';
import { selectPostPile } from 'store/postPile/selectors';
import { selectTopCardFromBlitzDeck } from 'store/blitzPile/selectors';
import { ActiveCard } from '.';
import gameService from 'services/game';


export const validDutchPileClick = (activeCard: ActiveCard, dutchPileAction: DutchPileAction) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
    const gameId = selectGameId(getState());
    const postPileFromState = selectPostPile(getState());
    const topBlitzDeckCard = selectTopCardFromBlitzDeck(getState());
    const card: Card = activeCard?.card;

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

    switch (dutchPileAction) {
        case DutchPileAction.ADD:
        case DutchPileAction.CREATE:
            const dutchPileId = await gameService.createDutchPile(gameId, activeCard);
            dispatch(createDutchPile(activeCard.card, dutchPileId));
            break;
    }

    dispatch(clearActiveCard());
}

// export const connectToDutchPiles = (gameId: string) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
//     const dutchPilesRef = await gameService.connectToGame(gameId);
// }
