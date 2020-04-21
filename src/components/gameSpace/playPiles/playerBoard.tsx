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

interface PlayerBoardProps {
}

export const PlayerBoardComponent: React.FC<PlayerBoardProps> = ({ }) => {
  // const dispatch = useDispatch();
  const player = useSelector(selectPlayerState);
  console.log(player, 'player')

  // const deck = buildDeck();
  // const blitzDeck = deck.splice(0, 10);
  // const postDeck = deck.splice(0, 3);

  // dispatch(initializeBlitzDeck(playerId, blitzDeck));
  // dispatch(initializePostPile(playerId, postDeck));
  // dispatch(initializeWoodPile(playerId, deck));

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
