import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { PlayerBoardComponent } from 'components/gameSpace/playPiles/playerBoard';
import { NextRoundLobby } from 'components/menu/nextRoundLobbyView';
import { GameStatus } from 'models/games';
import { selectGameStatus } from 'store/game/selectors';
import { DutchPileContainerComponent } from './dutchPile/dutchPileContainer';
import { selectOpponentsHands } from 'store/players/selectors';
import OpponentBoard from './playPiles/opponentBoard';

const styles = makeStyles(() => ({
  boardContainer: {
    display: 'grid',
    gridTemplateRows: '20% 50% 30%',
    gridTemplateColumns: '20% 60% 20%',
    height: '100%',
    width: '100%'
  },
  topOpponent: {
    gridColumn: 2,
    gridRow: 1
  },
  leftOpponent: {
    gridColumn: 1,
    gridRow: 2
  },
  rightOpponent: {
    gridColumn: 3,
    gridRow: 2
  },
  self: {
    gridColumn: '1/4',
    gridRow: 3
  },
  dutchPiles: {
    gridColumn: 2,
    gridRow: 2
  }
}));

export const Board: React.FC = () => {
  const classes = styles();
  const gameStatus = useSelector(selectGameStatus);
  const opponentHands = useSelector(selectOpponentsHands);

  return (
    <div className={classes.boardContainer}>
      {gameStatus === GameStatus.ACTIVE
        ? <>
          <PlayerBoardComponent gridClass={classes.self} />
          <OpponentBoard gridClass={classes.topOpponent} opponent={opponentHands[0]} />
          {
            opponentHands.length > 2 &&
            <OpponentBoard
              gridClass={classes.leftOpponent}
              opponent={opponentHands[1]}
              vertical={true}
            />}
          {opponentHands.length > 3 &&
            <OpponentBoard
              gridClass={classes.rightOpponent}
              opponent={opponentHands[2]}
              vertical={true}
            />}
          <DutchPileContainerComponent gridClass={classes.dutchPiles} />
        </>
        : <NextRoundLobby gridClass={classes.dutchPiles}/>
      }
    </div>);
}
