import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { endRound } from 'store/game/operations';
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
const Button = styled.button`
  border: solid black;
`;

export const PlayerBoardComponent: React.FC = () => {
  const dispatch = useDispatch();
  const player = useSelector(selectPlayerState);
  const handleClick = () => {
    dispatch(endRound());
  }

  return (
    <>
      <div>
        {player.name}
      </div>
      <Button onClick={handleClick}>End Game</Button>
      <PlayerHandContainer>
        <BlitzDeck />
        <PostPile />
        <WoodPile />
      </PlayerHandContainer>
    </>
  );
}
