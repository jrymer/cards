import { Card } from 'models/card';
import { DutchPileAction } from 'models/piles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validDutchPileClick } from 'store/dutchPile/operations';
import { ActiveCard } from 'store/players';
import { clearActiveCard } from 'store/players/actions';
import { selectCurrentPlayerNumber } from 'store/players/selectors';
import styled from 'styled-components';

import { CardComponent } from '../card';

export interface DutchPileProps {
  activeCard: ActiveCard;
  topCard: Card;
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

export const DutchPileComponent: React.FC<DutchPileProps> = ({ activeCard, topCard, id }) => {
  const dispatch = useDispatch();
  const card: Card = activeCard?.card;
  const playerNumber = useSelector(selectCurrentPlayerNumber);
  const handleValidDutchPileClick = (): void => {
    dispatch(validDutchPileClick(activeCard, DutchPileAction.ADD, id));
  };

  const handleInvalidDutchPileClick = (): void => {
    dispatch(clearActiveCard(playerNumber));
  };

  const validDutchPile = (): React.ReactNode => (
    <ValidDutchPile>
      <CardComponent handleClick={handleValidDutchPileClick} card={topCard} />
    </ValidDutchPile>
  );

  const invalidDutchPile = (): React.ReactNode => (
    <InvalidDutchPile>
      <CardComponent handleClick={handleInvalidDutchPileClick} card={topCard} />
    </InvalidDutchPile>
  );

  const renderDutchPile = (): React.ReactNode => {
    if (activeCard) {
      if ((topCard.color === card.color) && (topCard.cardValue + 1 === card.cardValue)) {
        return validDutchPile();
      } else {
        return invalidDutchPile();
      }
    } else {
      return <CardComponent card={topCard} />
    }

  }

  return (
    <div>
      {renderDutchPile()}
    </div>
  );
};
