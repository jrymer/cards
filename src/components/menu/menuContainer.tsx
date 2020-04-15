import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import gameService from 'services/game';
import { initializeGame } from 'store/game/actions';
import styled from 'styled-components';

const CreateGameButton = styled.button`
  border: solid black;
`;

export const MenuContainer: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleCreateGame = async () => {
    const gameId = await gameService.createGame();
    dispatch(initializeGame(gameId));
    history.push(`/${gameId}/players`);
  };

  return (
    <>
      <CreateGameButton onClick={handleCreateGame}>Create Game</CreateGameButton>
    </>
  );
};
