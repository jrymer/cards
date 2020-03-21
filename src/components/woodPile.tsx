import { CardComponent } from 'components/card';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { redrawWoodPile } from 'store/woodPile/actions';
import { selectTopCardFromWoodPile } from 'store/woodPile/selectors';
import styled from 'styled-components';

const WoodPileContainer = styled.div`
  margin-left: 4px;
`;

export const WoodPile: React.FC = () => {
  const dispatch = useDispatch();
  const topCard = useSelector(selectTopCardFromWoodPile);

  const handleTopCardClicked = (): void => {
    dispatch(redrawWoodPile());
  };

  return (
    <WoodPileContainer>
      Wood pile
      <CardComponent handleClick={handleTopCardClicked} card={{...topCard}}/>
    </WoodPileContainer>
  )
};

