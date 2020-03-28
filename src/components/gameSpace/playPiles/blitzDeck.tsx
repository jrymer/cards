import { CardComponent } from 'components/gameSpace/card';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTopCardFromBlitzDeck } from 'store/blitzPile/selectors';
import { setActiveBlitzCard } from 'store/dutchPile/actions';
import styled from 'styled-components';

const BlitzDeckContainer = styled.div`
  margin-right: 4px;
`;

export const BlitzDeck: React.FC = () => {
  const dispatch = useDispatch();
  const topCard = useSelector(selectTopCardFromBlitzDeck);

  const handleTopCardClicked = (): void => {
    dispatch(setActiveBlitzCard(topCard));
  };

  return (
    <BlitzDeckContainer>
      Blitz Deck
      <CardComponent handleClick={handleTopCardClicked} card={{...topCard}}/>
    </BlitzDeckContainer>
  )
};

