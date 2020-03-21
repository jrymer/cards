import { DutchPileComponent } from 'components/dutchPile/dutchPile';
import { EmptyDutchPileComponent } from 'components/dutchPile/emptyDutchPile';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveDutchPiles } from 'store/dutchPile/selectors';
import styled from 'styled-components';

const DutchPileContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: solid black;
`;

export const DutchPileContainerComponent: React.FC = () => {
  const dispatch = useDispatch();
  const dutchPiles = useSelector(selectActiveDutchPiles);
  const dutchPileKeys = dutchPiles ? Object.keys(dutchPiles) : [];

  const renderDutchPiles = (): HTMLElement => {
    return Object.keys(dutchPiles).map((key: string) => {
      return <DutchPileComponent key={key} dutchPile={dutchPiles[key]} id={key}/>
    })
  }
  return (
    <DutchPileContainer>
      {dutchPileKeys.length < 4 && <EmptyDutchPileComponent />}
      {dutchPiles && renderDutchPiles()}
        {/* <div onClick={handleDutchPileClick}>initialize dutch pile</div> */}
      </DutchPileContainer>
  );
};
