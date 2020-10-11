import React from 'react';

import { Card } from 'models/card';
import { DutchPileAction } from 'models/piles';
import { useDispatch, useSelector } from 'react-redux';
import { validDutchPileClick } from 'store/dutchPile/operations';
import { ActiveCard } from 'store/players';
import { clearActiveCard } from 'store/players/actions';
import { selectCurrentPlayerNumber } from 'store/players/selectors';
import { CardComponent } from '../cards/card';

export interface DutchPileProps {
  activeCard: ActiveCard;
  topCard: Card;
  id: string;
}

const imageSize = 150;

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

  const renderDutchPile = (): React.ReactNode => {
    if (activeCard) {
      if ((topCard.color === card.color) && (topCard.cardValue + 1 === card.cardValue)) {
        return <CardComponent handleClick={handleValidDutchPileClick} card={topCard} height={imageSize} width={imageSize} />;
      } else {
        return <CardComponent handleClick={handleInvalidDutchPileClick} card={topCard} height={imageSize} width={imageSize} />;
      }
    } else {
      return <CardComponent card={topCard} height={imageSize} width={imageSize} />
    }

  }

  return (
    <>
      {renderDutchPile()}
    </>
  );
};
