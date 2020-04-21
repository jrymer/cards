import { DutchPileComponent } from 'components/gameSpace/dutchPile/activeDutchPile';
import { EmptyDutchPileComponent } from 'components/gameSpace/dutchPile/emptyDutchPile';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActiveCard } from 'store/dutchPile';
import { selectActiveCard, selectActiveDutchPiles } from 'store/dutchPile/selectors';
import styled from 'styled-components';

const DutchPileContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: solid black;
`;

export const DutchPileContainerComponent: React.FC = () => {
  const dispatch = useDispatch();
  const activeCard: ActiveCard = useSelector(selectActiveCard);
  // const card: Card = activeCard?.card;
  // const postPileFromState = useSelector(selectPostPile);
  // const topBlitzDeckCard = useSelector(selectTopCardFromBlitzDeck);
  const dutchPiles = useSelector(selectActiveDutchPiles);
  const dutchPileKeys = dutchPiles ? Object.keys(dutchPiles) : [];

  const handleValidPileClick = (): void => {
    // dispatch(validDutchPileClick(activeCard));
    // switch (activeCard.pile) {
    //   case Piles.BLITZ:
    //     dispatch(newTopBlitzCard());
    //     break;
    //   case Piles.POST: {
    //     const newPostPile = postPileFromState.filter((postCards: Card): boolean => {
    //       return (postCards.cardValue !== card.cardValue) || (postCards.color !== card.color);
    //     });

    //     newPostPile.push(topBlitzDeckCard);
    //     dispatch(topBlitzCardToPostPile(newPostPile));
    //     dispatch(newTopBlitzCard());
    //     break;
    //   }
    //   case Piles.WOOD:
    //     dispatch(removeCardFromWoodPile(card));
    //     break;
    // }
    // dispatch(clearActiveCard());
  };

  const renderDutchPiles = () => (
    Object.keys(dutchPiles).map((key: string) =>
      <DutchPileComponent key={key} activeCard={activeCard} dutchPile={dutchPiles[key]} id={key} handleValidPileClick={handleValidPileClick} />
    )
  );

  return (
    <DutchPileContainer>
      {dutchPileKeys.length < 4 && <EmptyDutchPileComponent activeCard={activeCard} handleValidPileClick={handleValidPileClick} />}
      {dutchPiles && renderDutchPiles()}
    </DutchPileContainer>
  );
};
