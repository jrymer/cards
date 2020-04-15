import { CardColorValues } from 'models/card';
import { PlayerNumber } from 'models/playerNumbers';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Player } from 'store/players';
import { addPlayer } from 'store/players/actions';
import styled from 'styled-components';

interface PlayerButtonProps {
  color: CardColorValues;
}

const PlayerButton = styled.button`
  background-color: ${(p: PlayerButtonProps): CardColorValues => p.color};
  border: solid black;
`;
const StartButton = styled.button`
  background-color: 'green';
  border: solid black;
`;

export const PlayerSelect: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { gameId } = useParams();

  const handlePlayerButtonClick = (playerId: PlayerNumber): void => {
    const player: Player = {
      id: playerId,
      name: 'name',
      playerNumber: playerId,
      startTime: new Date()
    };

    if (playerId === PlayerNumber.BOT) {
      localStorage.setItem(PlayerNumber.BOT, JSON.stringify(player));
    } else {
      dispatch(addPlayer(player, gameId));
    }
  };

  const handleStartGame = (): void => {
    console.log(gameId);
    history.push(`/${gameId}/board`);
  };

  const renderPlayerButtons = () => {
    const colorValues = Object.values(CardColorValues);
    const playerNames = Object.keys(PlayerNumber);

    return Object.values(PlayerNumber).map((playerName: PlayerNumber, index: number) => (
      <PlayerButton key={playerName} color={colorValues[index]} onClick={(): void => handlePlayerButtonClick(playerName)}>{playerNames[index]}</PlayerButton>
    ));
  };

  return (
    <div>
      menu
      {renderPlayerButtons()}
      <StartButton onClick={handleStartGame}>START</StartButton>
    </div>
  );
};
