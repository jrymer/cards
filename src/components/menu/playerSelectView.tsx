import { CardColorValues } from 'models/card';
import { PlayerNumber } from 'models/playerNumbers';
import React, { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { startGame } from 'store/game/operations';
import { selectActivePlayers, selectGameId } from 'store/game/selectors';
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
  const activePlayers = useSelector(selectActivePlayers);
  const [playerName, setPlayerName] = React.useState<string>('');
  
  const handlePlayerButtonClick = async (playerId: PlayerNumber) => {
    const playerNumber = Object.keys(PlayerNumber)[Object.values(PlayerNumber).indexOf(playerId)];

    const player: Player = {
      id: playerId,
      name: playerName || playerId,
      playerNumber,
      startTime: Date.now()
    };
    dispatch(initializePlayer(player, gameId, activePlayers));
  };

  const handleStartGame = (): void => {
    dispatch(startGame(gameId));
    // history.push(`/${gameId}/board`);
  };

  const renderPlayerButtons = () => {
    const colorValues = Object.values(CardColorValues);
    const availablePlayerNames = Object.keys(PlayerNumber).filter((name: PlayerNumber) => !activePlayers.includes(name));
    const playerNames = Object.keys(PlayerNumber);

    return Object.values(PlayerNumber).map((playerName: PlayerNumber, index: number) => (
      <PlayerButton disabled={!availablePlayerNames.includes(playerNames[index])} key={playerName} color={colorValues[index]} onClick={() => handlePlayerButtonClick(playerName)}>{playerNames[index]}</PlayerButton>
    ));
  };

  const handlePlayerNameChange = (event: FormEvent<HTMLInputElement>): void => {
    setPlayerName(event.currentTarget.value);
  }

  return (
    <div>
      <input type='text' name='playerName' onChange={handlePlayerNameChange} value={playerName}></input>
      {renderPlayerButtons()}
      <StartButton disabled={activePlayers.length < 2} onClick={handleStartGame}>START</StartButton>
      {gameId}
    </div>
  );
};
