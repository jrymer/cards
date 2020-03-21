import { BlitzDeck } from 'components/blitzDeck';
import { DutchPileContainerComponent } from 'components/dutchPile/dutchPileContainer';
import { PostPile } from 'components/postPile';
import { WoodPile } from 'components/woodPile';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { initializeBlitzDeck } from 'store/blitzPile/actions';
import { initializePostPile } from 'store/postPile/actions';
import { initializeWoodPile } from 'store/woodPile/actions';
import styled from 'styled-components';
import { buildDeck } from 'utils/deckFunctions';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlayerHandContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: solid black;
`;

export const Board: React.FC = () => {
  const dispatch = useDispatch();

  const deck = buildDeck();
  const blitzDeck = deck.splice(0, 10);
  const postDeck = deck.splice(0, 3);

  dispatch(initializeBlitzDeck(blitzDeck));
  dispatch(initializePostPile(postDeck));
  dispatch(initializeWoodPile(deck));

  return (
    <BoardContainer>
      <DutchPileContainerComponent />
      <PlayerHandContainer>
        <BlitzDeck />
        <PostPile />
        <WoodPile />
      </PlayerHandContainer>
    </BoardContainer>);
}
