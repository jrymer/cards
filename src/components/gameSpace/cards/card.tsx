import { Card } from 'models/card';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectPlayerImage } from 'store/players/selectors';
import { colorTransformer } from 'utils/colorTransformer';
import { getImage } from 'utils/imageFunctions';

interface CardProps {
  card: Card;
  handleClick?: (card: Card) => void;
  height?: number;
  width?: number;
}
const imageSizeDefault = 200;

/**
 * Renders a card with a number and colored background
 *
 * @param {Card} {card} Card object with color and number value
 */
export const CardComponent: React.FC<CardProps> = ({
  card,
  handleClick,
  height = imageSizeDefault,
  width = imageSizeDefault
}) => {
  const playerImage = useSelector(selectPlayerImage);
  const { color, cardValue } = card;
  const style: React.CSSProperties = {
    height: height,
    width: width,
    padding: 10,
    margin: 15,
    borderRadius: 25,
    boxShadow: '10px 5px 10px rgba(0, 0, 0, 0.4)',
    backgroundColor: colorTransformer(color),
    backgroundImage: `url(${getImage(playerImage)})`,
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

  const handleCardClick = (): void => handleClick(card);

  return (
    <div style={style} onClick={handleCardClick}>
      <span>{cardValue}</span>
      <span>{cardValue}</span>
    </div>
  )
}
