import React from 'react';
import { useSelector } from 'react-redux';
import { selectPlayerState } from 'store/players/selectors';
import styled from 'styled-components';

import { BlitzDeck } from './blitzDeck';
import { PostPile } from './postPile';
import { WoodPile } from './woodPile';

const PlayerHandContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: solid black;
`;

export const PlayerBoardComponent: React.FC = () => {
  const player = useSelector(selectPlayerState);

  return (
    <>
      <div>
        {player.name}
      </div>
      <PlayerHandContainer>
        <BlitzDeck />
        <PostPile />
        <WoodPile />
      </PlayerHandContainer>
    </>
  );
}
