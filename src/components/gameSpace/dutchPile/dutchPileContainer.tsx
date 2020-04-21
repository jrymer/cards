import { DutchPileComponent } from 'components/gameSpace/dutchPile/activeDutchPile';
import { EmptyDutchPileComponent } from 'components/gameSpace/dutchPile/emptyDutchPile';
import React from 'react';
import { useSelector } from 'react-redux';
import { ActiveCard } from 'store/dutchPile';
import { selectActiveCard, selectActiveDutchPiles } from 'store/dutchPile/selectors';
import styled from 'styled-components';

const DutchPileContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: solid black;
`;

export const DutchPileContainerComponent: React.FC = () => {
  const activeCard: ActiveCard = useSelector(selectActiveCard);
  const dutchPiles = useSelector(selectActiveDutchPiles);
  const dutchPileKeys = dutchPiles ? Object.keys(dutchPiles) : [];

  const renderDutchPiles = () => (
    Object.keys(dutchPiles).map((key: string) =>
      <DutchPileComponent key={key} activeCard={activeCard} dutchPile={dutchPiles[key]} id={key} />
    )
  );

  return (
    <DutchPileContainer>
      {dutchPileKeys.length < 4 && <EmptyDutchPileComponent activeCard={activeCard} />}
      {dutchPiles && renderDutchPiles()}
    </DutchPileContainer>
  );
};
