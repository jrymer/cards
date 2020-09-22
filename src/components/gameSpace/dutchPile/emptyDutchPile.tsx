import { DutchPileAction } from 'models/piles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validDutchPileClick } from 'store/dutchPile/operations';
import { ActiveCard } from 'store/players';
import { clearActiveCard } from 'store/players/actions';
import { selectCurrentPlayerNumber } from 'store/players/selectors';
import styled from 'styled-components';


interface EmptyDutchPileProps {
  activeCard: ActiveCard;
}

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

export const EmptyDutchPileComponent: React.FC<EmptyDutchPileProps> = ({activeCard}) => {
  const dispatch = useDispatch();
  const playerNumber = useSelector(selectCurrentPlayerNumber);

  const handleValidEmptyDutchPileClick = (): void => {
    dispatch(validDutchPileClick(activeCard, DutchPileAction.CREATE));
  };

  const handleInvalidEmptyDutchPileClick = (): void => {
    dispatch(clearActiveCard(playerNumber));
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
