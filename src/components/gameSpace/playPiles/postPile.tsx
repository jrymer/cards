import { CardComponent } from 'components/gameSpace/card';
import { Card } from 'models/card';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePostCard } from 'store/players/actions';
import { selectCurrentPlayerNumber, selectPostPile } from 'store/players/selectors';
import styled from 'styled-components';

const PostPileContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PostPile: React.FC = () => {
  const dispatch = useDispatch();
  const postPileFromState = useSelector(selectPostPile);
  const currentPlayerNumber = useSelector(selectCurrentPlayerNumber);

  const handleCardClick = (cardPlayed: Card): void => {
    dispatch(setActivePostCard(cardPlayed, currentPlayerNumber));
  };

  const postPile = postPileFromState.map((card: Card, index: number) => (
    <CardComponent key={index} handleClick={handleCardClick} card={{ ...card }} />
  ));

  return (
    <div>
      Post Pile
      <PostPileContainer>
        {postPile}
      </PostPileContainer>
    </div>
  )
};
