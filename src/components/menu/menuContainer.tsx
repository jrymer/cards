import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectGameId } from 'store/game/selectors';
import styled from 'styled-components';

import { CreateGameView } from './createGameView';
import { PlayerSelect } from './playerSelectView';

const Button = styled.button`
  border: solid black;
`;

export const MenuContainer: React.FC = () => {
  const gameId = useSelector(selectGameId);
  const history = useHistory();

  const handleReturnToMenu = (): void => {
    history.push(`/`);
  };

  return (
    <>
      {
        gameId
          ? <PlayerSelect />
          : <CreateGameView />
      }
      <Button onClick={handleReturnToMenu}>Return to Menu</Button>
    </>
  );
};
