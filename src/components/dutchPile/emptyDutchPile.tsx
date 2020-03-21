import { Card } from 'models/card';
import { Piles } from 'models/piles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newTopBlitzCard } from 'store/blitzPile/actions';
import { selectTopCardFromBlitzDeck } from 'store/blitzPile/selectors';
import { clearActiveCard, createDutchPile } from 'store/dutchPile/actions';
import { selectActiveCard } from 'store/dutchPile/selectors';
import { topBlitzCardToPostPile } from 'store/postPile/actions';
import { selectPostPile } from 'store/postPile/selectors';
import { removeCardFromWoodPile } from 'store/woodPile/actions';
import styled from 'styled-components';

const ValidEmptyDutchPile = styled.div`
  border: solid green;
  width: 24px;
  height: 24px;
`;

const InvalidEmptyDutchPile = styled.div`
  border: solid red;
  width: 24px;
  height: 24px;
`;

export const EmptyDutchPileComponent: React.FC = () => {
  const dispatch = useDispatch();
  const activeCard = useSelector(selectActiveCard);
  const topBlitzDeckCard = useSelector(selectTopCardFromBlitzDeck);
  const postPileFromState = useSelector(selectPostPile);

  const handleValidEmptyDutchPileClick = (): void => {
    const { card } = activeCard;

    dispatch(createDutchPile({ ...card }));
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
    dispatch(clearActiveCard());
  };

  const handleInvalidEmptyDutchPileClick = (): void => {
    dispatch(clearActiveCard());
  };

  return (
    <div>
      {activeCard?.card.cardValue === 1
        ? <ValidEmptyDutchPile onClick={handleValidEmptyDutchPileClick} />
        : <InvalidEmptyDutchPile onClick={handleInvalidEmptyDutchPileClick} />
      }
    </div>

  );
};
