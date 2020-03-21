import React from 'react';
import { useDispatch } from 'react-redux';
import { DutchPile } from 'store/dutchPile';
import { addActiveCardToDutchPile, clearActiveCard } from 'store/dutchPile/actions';

import { CardComponent } from '../card';

interface DutchPileProps {
  dutchPile: DutchPile;
  id: string;
}

export const DutchPileComponent: React.FC<DutchPileProps> = ({ dutchPile, id }) => {
  const dispatch = useDispatch();
  const card = Object.values(dutchPile)[0];  

  const handleDutchPileClick = (): void => {
    dispatch(addActiveCardToDutchPile(id));
    dispatch(clearActiveCard());
  };

  return (
    <CardComponent handleClick={handleDutchPileClick} card={{...card}}/>
  );
};
