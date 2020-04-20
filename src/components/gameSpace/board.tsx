import { PlayerBoardComponent } from 'components/gameSpace/playPiles/playerBoard';
import { PlayerNumber } from 'models/playerNumbers';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectActivePlayers } from 'store/game/selectors';
import styled from 'styled-components';

import { DutchPileContainerComponent } from './dutchPile/dutchPileContainer';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Board: React.FC = () => {
  const activePlayers: PlayerNumber[] = useSelector(selectActivePlayers);

  return (
    <BoardContainer>
      <PlayerBoardComponent />
      <DutchPileContainerComponent />
    </BoardContainer>);
}
