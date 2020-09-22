import { DutchPileComponent } from 'components/gameSpace/dutchPile/activeDutchPile';
import { EmptyDutchPileComponent } from 'components/gameSpace/dutchPile/emptyDutchPile';
import { Card } from 'models/card';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectDutchPileState } from 'store/dutchPile/selectors';
import { ActiveCard } from 'store/players';
import { selectActiveCard, selectActivePlayers } from 'store/players/selectors';
import styled from 'styled-components';

const DutchPileContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: solid black;
`;

export const DutchPileContainerComponent: React.FC = () => {
  const activeCard: ActiveCard = useSelector(selectActiveCard);
  const dutchPiles = useSelector(selectDutchPileState);
  const activePlayers = useSelector(selectActivePlayers);
  const dutchPileKeys = dutchPiles ? Object.keys(dutchPiles) : [];
  
  const renderDutchPiles = (): React.ReactNode => (
    Object.keys(dutchPiles).map((key: string) => {
      
      const topDutchIndex = Object.keys(dutchPiles[key]).length - 1;
      const cardValues = {...Object.values(dutchPiles[key])[topDutchIndex]};
      const topCard: Card = {cardValue: cardValues.cardValue, color: cardValues.color}
      return  <DutchPileComponent key={key} activeCard={activeCard} topCard={topCard} id={key} />
    })
  );

  return (
    <DutchPileContainer>
      {dutchPileKeys.length < (activePlayers.length * 4) && <EmptyDutchPileComponent activeCard={activeCard} />}
      {dutchPiles && renderDutchPiles()}
    </DutchPileContainer>
  );
};
