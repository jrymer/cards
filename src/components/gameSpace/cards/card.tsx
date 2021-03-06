import { makeStyles } from '@material-ui/core';
import { Card, PlayerImages } from 'models/card';
import React from 'react';

import { colorTransformer } from 'utils/colorTransformer';
import { getPlayerImage } from 'utils/imageFunctions';

interface CardProps {
  card: Card;
  handleClick?: (card: Card) => void;
  playerImage: PlayerImages;
  height?: number;
  width?: number;
}
const imageSizeDefault = 200;

const styles = makeStyles(() => ({
  topRight: {
      alignSelf: 'flex-end',
      justifySelf: 'flex-start'
  },
  bottomLeft: {
      alignSelf: 'flex-start',
      justifySelf: 'flex-end'
  }
}));

/**
 * Renders a card with a number and colored background
 *
 * @param {Card} {card} Card object with color and number value
 */
export const CardComponent: React.FC<CardProps> = ({
  card,
  handleClick,
  playerImage,
  height = imageSizeDefault,
  width = imageSizeDefault
}) => {
  const classes = styles();
  const { color, cardValue } = card;
  const style: React.CSSProperties = {
    height: height,
    width: width,
    padding: 10,
    margin: 15,
    borderRadius: 25,
    boxShadow: '10px 5px 10px rgba(0, 0, 0, 0.4)',
    backgroundColor: colorTransformer(color),
    backgroundImage: `url(${getPlayerImage(playerImage)})`,
    backgroundSize: '55% 55%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 'x-large'
  };

  const handleCardClick = (): void => handleClick && handleClick(card);

  return (
    <div style={style} onClick={handleCardClick}>
      <span className={classes.topRight}>{cardValue}</span>
      <span className={classes.bottomLeft}>{cardValue}</span>
    </div>
  )
}
