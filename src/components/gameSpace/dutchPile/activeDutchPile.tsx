import { Card } from 'models/card';
import { DutchPileAction } from 'models/piles';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ActiveCard, DutchPile } from 'store/dutchPile';
import { clearActiveCard } from 'store/dutchPile/actions';
import { validDutchPileClick } from 'store/dutchPile/operations';
import styled from 'styled-components';

import { CardComponent } from '../card';

export interface DutchPileProps {
  activeCard: ActiveCard;
  dutchPile: DutchPile;
  id: string;
}

const ValidDutchPile = styled.div`
  border: solid green;
  width: 24px;
  height: 24px;
`;

const InvalidDutchPile = styled.div`
  border: solid red;
  width: 24px;
  height: 24px;
`;

export const DutchPileComponent: React.FC<DutchPileProps> = ({ activeCard, dutchPile, id }) => {
  const dispatch = useDispatch();
  const card: Card = activeCard?.card;
  const topDutchPileCard: Card = Object.values(dutchPile)[Object.keys(dutchPile).length - 1];

  const handleValidDutchPileClick = (): void => {
    dispatch(validDutchPileClick(activeCard, DutchPileAction.ADD, id));
  };

  const handleInvalidDutchPileClick = (): void => {
    dispatch(clearActiveCard());
  };

  const validDutchPile = () => (
    <ValidDutchPile>
      <CardComponent handleClick={handleValidDutchPileClick} card={{ ...topDutchPileCard }} />
    </ValidDutchPile>
  );

  const invalidDutchPile = () => (
    <InvalidDutchPile>
      <CardComponent handleClick={handleInvalidDutchPileClick} card={{ ...topDutchPileCard }} />
    </InvalidDutchPile>
  );

  const renderDutchPile = () => {
    if (activeCard) {
      if ((topDutchPileCard.color === card.color) && (topDutchPileCard.cardValue + 1 === card.cardValue)) {
        return validDutchPile();
      } else {
        return invalidDutchPile();
      }
    } else {
      return <CardComponent card={{ ...topDutchPileCard }} />
    }

  }

  return (
    <div>
      {renderDutchPile()}
    </div>
  );
};
