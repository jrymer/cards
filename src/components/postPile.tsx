import { CardComponent } from 'components/card';
import { Card } from 'models/card';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newTopBlitzCard } from 'store/blitzPile/actions';
import { selectTopCardFromBlitzDeck } from 'store/blitzPile/selectors';
import { topBlitzCardToPostPile } from 'store/postPile/actions';
import { selectPostPile } from 'store/postPile/selectors';
import styled from 'styled-components';

const PostPileContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PostPile: React.FC = () => {
  const dispatch = useDispatch();
  const topBlitzDeckCard = useSelector(selectTopCardFromBlitzDeck);
  const postPileFromState = useSelector(selectPostPile);

  const handleCardClick = (cardPlayed: Card): void => {
    const newPostPile = postPileFromState.filter((card: Card): boolean => {
      return (card.cardValue !== cardPlayed.cardValue) || (card.color !== cardPlayed.color);
    });

    newPostPile.push(topBlitzDeckCard);
    dispatch(topBlitzCardToPostPile(newPostPile));
    dispatch(newTopBlitzCard());
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
