import { CardComponent } from 'components/gameSpace/card';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveBlitzCard } from 'store/players/actions';
import { selectCurrentPlayerNumber, selectTopCardFromBlitzDeck } from 'store/players/selectors';
import styled from 'styled-components';

const BlitzDeckContainer = styled.div`
  margin-right: 4px;
`;

export const BlitzDeck: React.FC = () => {
  const dispatch = useDispatch();
  const topCard = useSelector(selectTopCardFromBlitzDeck);
  const currentPlayerNumber = useSelector(selectCurrentPlayerNumber);

  const handleTopCardClicked = (): void => {
    dispatch(setActiveBlitzCard(topCard, currentPlayerNumber));
  };

  return (
    <BlitzDeckContainer>
      Blitz Deck
      <CardComponent handleClick={handleTopCardClicked} card={{...topCard}}/>
    </BlitzDeckContainer>
  )
};

