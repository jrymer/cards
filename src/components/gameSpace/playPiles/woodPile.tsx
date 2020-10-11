import { CardComponent } from 'components/gameSpace/card';
import { Card } from 'models/card';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { redrawWoodPile, setActiveWoodCard, shuffleWoodPile } from 'store/players/actions';
import { selectCurrentPlayerNumber, selectTopCardFromWoodPile } from 'store/players/selectors';
import styled from 'styled-components';

const WoodPileContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 4px;
`;
const DrawCardContainer = styled.div`
  border: solid grey;
  width: 24px;
  height: 24px;
`;
const ShuffleCardContainer = styled.div`
  border: solid brown;
  width: 24px;
  height: 24px;
`;

export const WoodPile: React.FC = () => {
  const dispatch = useDispatch();
  const topCard = useSelector(selectTopCardFromWoodPile);
  const currentPlayerNumber = useSelector(selectCurrentPlayerNumber);

  const handleRedrawTopCard = (): void => {
    dispatch(redrawWoodPile(currentPlayerNumber));
  };

  const handleAddTopCardToDutchPile = (card: Card): void => {
    dispatch(setActiveWoodCard(card, currentPlayerNumber));
  };

  const handleShuffleCard = (): void => {
    dispatch(shuffleWoodPile(currentPlayerNumber));
  }

  return (
    <WoodPileContainer>
      Wood pile
      <CardComponent handleClick={handleAddTopCardToDutchPile} card={{ ...topCard }} />
      <DrawCardContainer onClick={handleRedrawTopCard}>D</DrawCardContainer> 
      <ShuffleCardContainer onClick={handleShuffleCard}>S</ShuffleCardContainer>
    </WoodPileContainer>
  )
};

