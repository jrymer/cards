import { Card } from 'components/card';
import { ICard } from 'models/card';
import * as React from 'react';
import styled from 'styled-components';
import { buildDeck } from 'utils/deckFunctions';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Board: React.FC = () => {
  const deck = buildDeck();
  const deckOfCards = deck.map((card: ICard) => (
    <Card key={`${card.color}-${card.cardValue}`} card={{...card}} />)
  );
  return (<BoardContainer>{deckOfCards}</BoardContainer>);
}
