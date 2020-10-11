import { makeStyles } from '@material-ui/core';
import React from 'react';

import { BlitzDeck } from './blitzDeck';
import { PostPile } from './postPile';
import { WoodPile } from './woodPile';

interface Props {
  gridClass: string;
}

const styles = makeStyles(() => ({
  playerHandContainer: {
    display: 'grid',
    gridTemplateColumns: '20% 60% 20%'
  }
}));

export const PlayerBoardComponent: React.FC<Props> = ({gridClass}) => {
  const classes = styles();

  return (
    <div className={`${classes.playerHandContainer} ${gridClass}`}>
      <BlitzDeck />
      <PostPile />
      <WoodPile />
    </div>
  );
}
