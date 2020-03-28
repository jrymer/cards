import { DutchPileContainerComponent } from 'components/gameSpace/dutchPile/dutchPileContainer';
import { PlayerBoardComponent } from 'components/gameSpace/playPiles/playerBoard';
import { PlayerNumber } from 'models/playerNumbers';
import * as React from 'react';
import styled from 'styled-components';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Board: React.FC = () => {
  return (
    <BoardContainer>
      <PlayerBoardComponent playerId={PlayerNumber.BOT}/>
      <DutchPileContainerComponent />
      <PlayerBoardComponent playerId={PlayerNumber.PLAYER_ONE}/>
    </BoardContainer>);
}
