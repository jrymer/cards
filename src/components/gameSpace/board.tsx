import { PlayerBoardComponent } from 'components/gameSpace/playPiles/playerBoard';
import { NextRoundLobby } from 'components/menu/nextRoundLobbyView';
import { GameStatus } from 'models/games';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectGameStatus } from 'store/game/selectors';
import styled from 'styled-components';

import { DutchPileContainerComponent } from './dutchPile/dutchPileContainer';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Board: React.FC = () => {
  const gameStatus = useSelector(selectGameStatus);

  return (
    <BoardContainer>
      {gameStatus === GameStatus.ACTIVE
        ? <>
          <PlayerBoardComponent />
          <DutchPileContainerComponent />
        </>
        : <NextRoundLobby /> 
      }
    </BoardContainer>);
}
