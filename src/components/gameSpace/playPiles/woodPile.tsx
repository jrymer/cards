import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import CommonButton from 'components/common/CommonButton';
import CommonLabel from 'components/common/Label';
import { CardComponent } from 'components/gameSpace/cards/card';
import { Card } from 'models/card';
import { setActiveWoodCard } from 'store/players/actions';
import { selectCurrentPlayerImage, selectCurrentPlayerNumber, selectTopCardFromWoodPile } from 'store/players/selectors';
import { endRound } from 'store/game/operations';
import { updateTopWoodCard, updateWoodPileFromShuffle } from 'store/players/operations';

const styles = makeStyles(() => ({
  woodPileContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  mainContainer: {
    display: 'flex'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));

const labelStyle: React.CSSProperties = {
  alignSelf: 'flex-start',
  margin: 15
};

export const WoodPile: React.FC = () => {
  const dispatch = useDispatch();
  const classes = styles();
  const topCard = useSelector(selectTopCardFromWoodPile);
  const currentPlayerNumber = useSelector(selectCurrentPlayerNumber);
  const playerImage = useSelector(selectCurrentPlayerImage);

  const handleRedrawTopCard = (): void => {
    dispatch(updateTopWoodCard(currentPlayerNumber));
  };

  const handleAddTopCardToDutchPile = (card: Card): void => {
    dispatch(setActiveWoodCard(card, currentPlayerNumber));
  };

  const handleShuffleCard = (): void => {
    dispatch(updateWoodPileFromShuffle(currentPlayerNumber));
  };

  const handleEndRound = (): void => {
    dispatch(endRound());
  };

  return (
    <div className={classes.woodPileContainer}>
      <CommonLabel customStyles={labelStyle} label="Wood Pile" />
      <div className={classes.mainContainer}>
        {topCard && <CardComponent handleClick={handleAddTopCardToDutchPile} card={{ ...topCard }} playerImage={playerImage} />}
        <div className={classes.buttonContainer}>
          <CommonButton onClick={handleRedrawTopCard} title="Re-draw" width={150} />
          <CommonButton onClick={handleShuffleCard} title="Shuffle" width={150} />
          <CommonButton onClick={handleEndRound} title="End Round" width={150} />
        </div>
      </div>
    </div>
  )
};

