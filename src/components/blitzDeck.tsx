import { CardComponent } from 'components/card';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newTopBlitzCard } from 'store/blitzPile/actions';
import { selectTopCardFromBlitzDeck } from 'store/blitzPile/selectors';
import styled from 'styled-components';

const BlitzDeckContainer = styled.div`
  margin-right: 4px;
`;

export const BlitzDeck: React.FC = () => {
  const dispatch = useDispatch();
  const topCard = useSelector(selectTopCardFromBlitzDeck);

  const handleTopCardClicked = (): void => {
    dispatch(newTopBlitzCard());
  };

  return (
    <BlitzDeckContainer>
      Blitz Deck
      <CardComponent handleClick={handleTopCardClicked} card={{...topCard}}/>
    </BlitzDeckContainer>
  )
};

