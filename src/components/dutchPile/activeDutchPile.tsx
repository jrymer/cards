import { Card } from 'models/card';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ActiveCard, DutchPile } from 'store/dutchPile';
import { addActiveCardToDutchPile, clearActiveCard } from 'store/dutchPile/actions';
import styled from 'styled-components';

import { CardComponent } from '../card';

interface DutchPileProps {
  activeCard: ActiveCard;
  dutchPile: DutchPile;
  id: string;
  handleValidPileClick: () => void;
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

export const DutchPileComponent: React.FC<DutchPileProps> = ({ activeCard, dutchPile, id, handleValidPileClick }) => {
  const dispatch = useDispatch();
  const card: Card = activeCard?.card;
  const topDutchPileCard: Card = Object.values(dutchPile)[Object.keys(dutchPile).length - 1];

  const handleValidDutchPileClick = (): void => {
    dispatch(addActiveCardToDutchPile(id));
    handleValidPileClick();
  };

  const handleInvalidDutchPileClick = (): void => {
    dispatch(clearActiveCard());
  };

  const validDutchPile = (): HTMLElement => (
    <ValidDutchPile>
      <CardComponent handleClick={handleValidDutchPileClick} card={{ ...topDutchPileCard }} />
    </ValidDutchPile>
  );

  const invalidDutchPile = (): HTMLElement => (
    <InvalidDutchPile>
      <CardComponent handleClick={handleInvalidDutchPileClick} card={{ ...topDutchPileCard }} />
    </InvalidDutchPile>
  );

  const renderDutchPile = (): HTMLElement => {
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
