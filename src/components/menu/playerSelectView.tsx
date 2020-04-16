import { CardColorValues } from 'models/card';
import { PlayerNumber } from 'models/playerNumbers';
import React, { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectGameId } from 'store/game/selectors';
import { Player } from 'store/players';
import { initializePlayer } from 'store/players/operations';
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
  const gameId = useSelector(selectGameId);
  const [playerName, setPlayerName] = React.useState<string>('');
  
  const handlePlayerButtonClick = async (playerId: PlayerNumber) => {
    const player: Player = {
      id: playerId,
      name: playerName || playerId,
      playerNumber: playerId,
      startTime: Date.now()
    };
    dispatch(initializePlayer(player, gameId));
  };

  const handleStartGame = (): void => {
    
    history.push(`/${gameId}/board`);
  };

  const renderPlayerButtons = () => {
    const colorValues = Object.values(CardColorValues);
    const playerNames = Object.keys(PlayerNumber);

    return Object.values(PlayerNumber).map((playerName: PlayerNumber, index: number) => (
      <PlayerButton key={playerName} color={colorValues[index]} onClick={() => handlePlayerButtonClick(playerName)}>{playerNames[index]}</PlayerButton>
    ));
  };

  const handlePlayerNameChange = (event: FormEvent<HTMLInputElement>): void => {
    setPlayerName(event.currentTarget.value);
  }

  return (
    <div>
      <input type='text' name='playerName' onChange={handlePlayerNameChange} value={playerName}></input>
      {renderPlayerButtons()}
      <StartButton onClick={handleStartGame}>START</StartButton>
      {gameId}
    </div>
  );
};
