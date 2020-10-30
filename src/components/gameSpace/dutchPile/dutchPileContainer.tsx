import { makeStyles } from '@material-ui/core';
import React from 'react';

import { DutchPileComponent } from 'components/gameSpace/dutchPile/activeDutchPile';
import { Card } from 'models/card';
import { DutchPileAction } from 'models/piles';
import { useDispatch, useSelector } from 'react-redux';
import { validDutchPileClick } from 'store/dutchPile/operations';
import { selectDutchPileState } from 'store/dutchPile/selectors';
import { ActiveCard } from 'store/players';
import { clearActiveCard } from 'store/players/actions';
import { selectActiveCard, selectCurrentPlayerNumber } from 'store/players/selectors';

interface Props {
  gridClass: string;
}

interface StyleProps {
  valid: boolean;
}

const styles = makeStyles(() => ({
  dutchPilesContainer: (props: StyleProps) => ({
    display: 'flex',
    border: 'solid',
    flexWrap: 'wrap',
    cursor: props.valid ? 'pointer' : 'auto',
    borderColor: props.valid ? 'green' : 'black'
  })
}));

export const DutchPileContainerComponent: React.FC<Props> = ({gridClass}) => {
  const activeCard: ActiveCard = useSelector(selectActiveCard);
  const dutchPiles = useSelector(selectDutchPileState);
  const playerNumber = useSelector(selectCurrentPlayerNumber);
  const validNewDutchPileCard = React.useMemo(() => activeCard?.card.cardValue === 1, [activeCard]);
  const classes = styles({ valid: validNewDutchPileCard });
  const dispatch = useDispatch();

  const handleDutchContainerClick = () => {
    if (validNewDutchPileCard) {
      dispatch(validDutchPileClick(activeCard, DutchPileAction.CREATE));
    } else {
      dispatch(clearActiveCard(playerNumber));
    }
  }
  
  const renderDutchPiles = (): React.ReactNode => (
    Object.keys(dutchPiles).map((key: string) => {
      
      const topDutchIndex = Object.keys(dutchPiles[key]).length - 1;
      const cardValues = {...Object.values(dutchPiles[key])[topDutchIndex]};
      const topCard: Card = {cardValue: cardValues.cardValue, color: cardValues.color};
      const playerImage = Object.values(dutchPiles[key])[topDutchIndex].playerImage;
      return  topCard.cardValue !== 10 && <DutchPileComponent key={key} activeCard={activeCard} topCard={topCard} id={key} playerImage={playerImage}/>
    })
  );

  return (
    <div className={`${classes.dutchPilesContainer} ${gridClass}`} onClick={handleDutchContainerClick}>
      {dutchPiles && renderDutchPiles()}
    </div>
  );
};
