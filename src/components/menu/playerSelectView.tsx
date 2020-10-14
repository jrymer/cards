import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CommonButton from 'components/common/CommonButton';
import { CardColorValues, PlayerImages } from 'models/card';
import { GameStatus } from 'models/games';
import { PlayerNumber } from 'models/playerNumbers';
import { startGame } from 'store/game/operations';
import { selectGameId, selectGameStatus, selectCurrentPlayerImages } from 'store/game/selectors';
import { Player } from 'store/players';
import { initializePlayer } from 'store/players/operations';
import { selectActivePlayers } from 'store/players/selectors';
import CommonLabel from 'components/common/Label';
import PlayerImageCard from 'components/gameSpace/cards/PlayerImageCards';

const styles = makeStyles(() => ({
  playerSelectContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  playerButtonsContainer: {
    display: 'flex'
  },
  buttonContainer: {
    display: 'flex'
  },
  textField: {
    width: 500
  }
}));

export const PlayerSelect: React.FC = () => {
  const classes = styles();
  const history = useHistory();
  const dispatch = useDispatch();
  const gameId = useSelector(selectGameId);
  const gameStatus = useSelector(selectGameStatus);
  const activePlayers = useSelector(selectActivePlayers);
  const playerImages = useSelector(selectCurrentPlayerImages);

  const [step, setStep] = React.useState<number>(0);
  const [playerName, setPlayerName] = React.useState<string>('');

  // Listen to the game state and if it changes to active go to the board
  React.useEffect(() => {
    if (gameStatus === GameStatus.ACTIVE) {
      // Go to the board
      history.push(`/${gameId}/board`);
    }
  }, [dispatch, gameId, gameStatus, history]);

  const handlePlayerButtonClick = async (playerNumber: PlayerNumber, playerImage: PlayerImages): Promise<void> => {
    // const playerNumber = Object.keys(PlayerNumber)[Object.values(PlayerNumber).indexOf(playerId)];
    const player: Player = {
      name: playerName || playerNumber,
      playerImage,
      playerNumber,
      pointsFromDutchPile: 0,
      roundScore: 0,
      startTime: Date.now(),
      totalScore: 0
    };
    dispatch(initializePlayer(player, gameId));
    incrementStep();
  };

  const handleStartGame = (): void => {
    dispatch(startGame(gameId));
    // history.push(`/${gameId}/board`);
  };

  const renderPlayerButtons = (): React.ReactNode => {
    const colorValues = Object.values(CardColorValues);
    const availablePlayerNames = Object.keys(PlayerNumber)
      .filter((name: PlayerNumber) =>
        activePlayers ? !activePlayers.includes(name) : name);
    const playerNames = Object.keys(PlayerNumber);
    const playerButtons = Object.values(PlayerNumber).map((playerName: PlayerNumber, index: number) => (
      <PlayerImageCard
        key={playerName}
        disabled={!availablePlayerNames.includes(playerNames[index])}
        onClick={(): Promise<void> => handlePlayerButtonClick(playerName, playerImages[index])}
        source={playerImages[index]}
        backgroundColor={colorValues[index]}
      />
    ));
    return (
      <div className={classes.column}>
        <CommonLabel label="Select a player image to continue" />
        <div className={classes.playerButtonsContainer}>
          {playerButtons}
        </div>
      </div>
    )
  };

  const handlePlayerNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPlayerName(event.currentTarget.value);
  }
  const copyGameId = () => navigator.clipboard.writeText(gameId);

  const incrementStep = () => setStep(step + 1);

  const renderEnterDisplayName = (
    <>
      <CommonLabel label="Enter a display name to continue" />
      <TextField className={classes.textField} name='playerName' onChange={handlePlayerNameChange} placeholder="Enter display name" value={playerName} variant="outlined" />
      <CommonButton disabled={!Boolean(playerName.length)} onClick={incrementStep} title="Submit display name" width={500} />
    </>
  );

  return (
    <div className={classes.playerSelectContainer}>
      {step === 0 && renderEnterDisplayName}
      {step === 1 && renderPlayerButtons()}
      {step === 2 && (
        <div className={classes.column}>
          <CommonLabel label="More than one player must be active to continue" />
          <div className={classes.buttonContainer}>
            <CommonButton disabled={activePlayers && activePlayers.length < 2} onClick={handleStartGame} title="Start Game" />
            <CommonButton onClick={copyGameId} title="Copy Game ID" />
          </div>
        </div>
      )}
    </div>
  );
};
