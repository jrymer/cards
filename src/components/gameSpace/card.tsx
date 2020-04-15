import { Card } from 'models/card';
import React from 'react';
import styled from 'styled-components';
import { colorTransformer } from 'utils/colorTransformer';

interface CardProps {
  card: Card;
  handleClick?: (card: Card) => void;
}

interface CardContainerProps {
  color: string;
}

const CardContainer =  styled.section<CardContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: ${(p: CardContainerProps): string => p.color};
  width: 24px;
  height: 24px;
`;

/**
 * Renders a card with a number and colored background
 *
 * @param {Card} {card} Card object with color and number value
 */
export const CardComponent: React.FC<CardProps> = ({card, handleClick}) => {
  const {color, cardValue} = card;

  const handleCardClick = (): void => handleClick(card);

  return (
    <CardContainer onClick={handleCardClick} color={colorTransformer(color)}>
      {cardValue}
    </CardContainer>
  )
}
