import { Card } from 'components/card';
import { CardColorNames } from 'models/card';
import * as React from 'react';

export const Board: React.FC = () => <div><Card card={{color: CardColorNames.RED, cardValue: 1}}/></div>;