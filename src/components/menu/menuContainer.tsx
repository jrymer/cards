import React from 'react';
import { useSelector } from 'react-redux';
import { selectGameId } from 'store/game/selectors';

import { CreateGameView } from './createGameView';
import { PlayerSelect } from './playerSelectView';

export const MenuContainer: React.FC = () => {
  const gameId = useSelector(selectGameId);

  return (
    <>
      {
        gameId
          ? <PlayerSelect />
          : <CreateGameView />
      }
    </>
  );
};
