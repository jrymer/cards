import { CardComponent } from 'components/gameSpace/card';
import { Card } from 'models/card';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePostCard } from 'store/dutchPile/actions';
import { selectPostPile } from 'store/postPile/selectors';
import styled from 'styled-components';

const PostPileContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PostPile: React.FC = () => {
  const dispatch = useDispatch();
  const postPileFromState = useSelector(selectPostPile);

  const handleCardClick = (cardPlayed: Card): void => {
    dispatch(setActivePostCard(cardPlayed));
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
