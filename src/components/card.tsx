import { ICard } from 'models/card';
import React from 'react';
import styled from 'styled-components';
import { colorTransformer } from 'utils/colorTransformer';

interface CardProps {
  card: ICard;
};

interface CardContainerProps {
  color: string;
};

const CardContainer =  styled.section<CardContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: ${p => p.color};
  width: 24px;
  height: 24px;
`;

/**
 * Renders a card with a number and colored background
 *
 * @param {ICard} {card} Card object with color and number value
 */
export const Card: React.FC<CardProps> = ({card}) => {
  const {color, cardValue} = card;
  return (
    <CardContainer color={colorTransformer(color)}>
      {cardValue}
    </CardContainer>
  )
}