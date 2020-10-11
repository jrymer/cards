import { ThunkDispatch } from 'redux-thunk'; import { AnyAction } from 'redux';
import { selectGameId } from 'store/game/selectors';
import { Piles, DutchPileAction } from 'models/piles';
import gameService from 'services/game';
import { selectCurrentPlayerHand, selectCurrentPlayerNumber, selectCurrentPlayerPointsFromDuthcPile } from 'store/players/selectors';
import { ActiveCard, HandState } from 'store/players';
import { clearActiveCard } from 'store/players/actions';
import { filterCard } from 'utils/deckFunctions';
import { State } from '..';

export const validDutchPileClick = (activeCard: ActiveCard, dutchPileAction: DutchPileAction, dutchPileId?: string) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => State): Promise<void> => {
    const gameId = selectGameId(getState());
    const playerNumber = selectCurrentPlayerNumber(getState());
    const pointsFromDutchPile = selectCurrentPlayerPointsFromDuthcPile(getState()) + 1;
    const {blitzPile, postPile, woodPile} = selectCurrentPlayerHand(getState());
    let newHand: HandState = {activeCard, woodPile, blitzPile, postPile};

    switch (activeCard.pile) {
        case Piles.BLITZ:
            // dispatch(newTopBlitzCard(playerNumber));
            newHand = {...newHand, blitzPile: blitzPile.slice(1)}
            break;
        case Piles.POST: {
            // Removing the selected post pile card from the post pile
            // then moving the top card from the blitz pile onto the post pile.
            const newPostPile = [...filterCard(postPile, activeCard.card), ...blitzPile.slice(0,1)];
            // Remove the top blitz card
            newHand = {...newHand, postPile: newPostPile, blitzPile: blitzPile.slice(1)};
            // dispatch(topBlitzCardToPostPile(playerNumber));
            // dispatch(newTopBlitzCard(playerNumber));
            break;
        }
        case Piles.WOOD:
            newHand = {...newHand, woodPile: filterCard(woodPile, activeCard.card)};
            // dispatch(removeTopCardFromWoodPile(card, playerNumber));
            break;
    }

    const blitzPileDeduction = blitzPile.length * 2;
    const roundScore = pointsFromDutchPile - blitzPileDeduction;
    switch (dutchPileAction) {
        case DutchPileAction.ADD:
            await gameService.addCardToDutchPile(gameId, playerNumber, roundScore, pointsFromDutchPile, dutchPileId, newHand);
            break;
        case DutchPileAction.CREATE:
            await gameService.createDutchPile(gameId, playerNumber, roundScore, pointsFromDutchPile, newHand);
            break;
    }

    dispatch(clearActiveCard(playerNumber));
}
