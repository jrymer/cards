import { CardColorValues } from 'models/card';
import { GameStatus } from 'models/games';
import { PlayerNumber } from 'models/playerNumbers';
import React, { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { startGame } from 'store/game/operations';
import { selectGameId, selectGameStatus } from 'store/game/selectors';
import { Player } from 'store/players';
import { initializePlayer } from 'store/players/operations';
import { selectActivePlayers } from 'store/players/selectors';
import styled from 'styled-components';

interface PlayerButtonProps {
  color: CardColorValues;
}

const Button = styled.button`
  border: solid black;
`;

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
  const gameStatus = useSelector(selectGameStatus);
  const activePlayers = useSelector(selectActivePlayers);
  const [playerName, setPlayerName] = React.useState<string>('');

  // Listen to the game state and if it changes to active go to the board
  React.useEffect(() => {
    if (gameStatus === GameStatus.ACTIVE) {
      // Go to the board
      history.push(`/${gameId}/board`);
    }
  }, [dispatch, gameId, gameStatus, history]);

  const handlePlayerButtonClick = async (playerNumber: PlayerNumber): Promise<void> => {
    // const playerNumber = Object.keys(PlayerNumber)[Object.values(PlayerNumber).indexOf(playerId)];

    const player: Player = {
      name: playerName || playerNumber,
      playerNumber,
      pointsFromDutchPile: 0,
      roundScore: 0,
      startTime: Date.now(),
      totalScore: 0
    };
    dispatch(initializePlayer(player, gameId));
  };

  const handleStartGame = (): void => {
    dispatch(startGame(gameId));
    // history.push(`/${gameId}/board`);
  };

  const renderPlayerButtons = (): React.ReactNode => {
    const colorValues = Object.values(CardColorValues);
    const availablePlayerNames = Object.keys(PlayerNumber).filter((name: PlayerNumber) => activePlayers ? !activePlayers.includes(name) : name);
    const playerNames = Object.keys(PlayerNumber);

    return Object.values(PlayerNumber).map((playerName: PlayerNumber, index: number) => (
      <PlayerButton disabled={!availablePlayerNames.includes(playerNames[index])} key={playerName} color={colorValues[index]} onClick={(): Promise<void> => handlePlayerButtonClick(playerName)}>{playerNames[index]}</PlayerButton>
    ));
  };

  const handlePlayerNameChange = (event: FormEvent<HTMLInputElement>): void => {
    setPlayerName(event.currentTarget.value);
  }
  const copyGameId = () => navigator.clipboard.writeText(gameId);

  return (
    <div>
      <input type='text' name='playerName' onChange={handlePlayerNameChange} value={playerName}></input>
      {renderPlayerButtons()}
      <StartButton disabled={activePlayers && activePlayers.length < 2} onClick={handleStartGame}>START</StartButton>
      {gameId}
      <Button onClick={copyGameId}>Copy Game ID</Button>
    </div>
  );
};
