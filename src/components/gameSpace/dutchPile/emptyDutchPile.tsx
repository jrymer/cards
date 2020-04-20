import React from 'react';
import { useDispatch } from 'react-redux';
import { ActiveCard } from 'store/dutchPile';
import { clearActiveCard, createDutchPile } from 'store/dutchPile/actions';
import styled from 'styled-components';


interface EmptyDutchPileProps {
  activeCard: ActiveCard;
  handleValidPileClick: () => void;
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

export const EmptyDutchPileComponent: React.FC<EmptyDutchPileProps> = ({activeCard, handleValidPileClick}) => {
  const dispatch = useDispatch();

  const handleValidEmptyDutchPileClick = (): void => {
    const { card } = activeCard;

    handleValidPileClick();
    dispatch(createDutchPile({ ...card }));
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