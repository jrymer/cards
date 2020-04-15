import { PlayerNumber } from 'models/playerNumbers';
import React from 'react';
import { useDispatch } from 'react-redux';
import { initializeBlitzDeck } from 'store/blitzPile/actions';
import { initializePostPile } from 'store/postPile/actions';
import { initializeWoodPile } from 'store/woodPile/actions';
import styled from 'styled-components';
import { buildDeck } from 'utils/deckFunctions';

import { BlitzDeck } from './blitzDeck';
import { PostPile } from './postPile';
import { WoodPile } from './woodPile';

const PlayerHandContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: solid black;
`;

interface PlayerBoardProps {
  playerId: PlayerNumber;
}

export const PlayerBoardComponent: React.FC<PlayerBoardProps> = ({playerId}) => {
  const dispatch = useDispatch();

  const deck = buildDeck();
  const blitzDeck = deck.splice(0, 10);
  const postDeck = deck.splice(0, 3);

  dispatch(initializeBlitzDeck(playerId, blitzDeck));
  dispatch(initializePostPile(playerId, postDeck));
  dispatch(initializeWoodPile(playerId, deck));

  return (
    <PlayerHandContainer>
      <BlitzDeck />
      <PostPile />
      <WoodPile />
    </PlayerHandContainer>
  );
}
