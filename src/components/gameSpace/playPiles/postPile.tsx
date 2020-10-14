import { makeStyles } from '@material-ui/core';
import CommonLabel from 'components/common/Label';
import { CardComponent } from 'components/gameSpace/cards/card';
import { Card } from 'models/card';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePostCard } from 'store/players/actions';
import { selectCurrentPlayerNumber, selectPostPile } from 'store/players/selectors';

const styles = makeStyles(() => ({
  mainContainer: {
    justifySelf: 'center'
  },
  postPileContainer: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const labelStyle: React.CSSProperties = {
  alignSelf: 'flex-start',
  margin: 15
};

export const PostPile: React.FC = () => {
  const dispatch = useDispatch();
  const classes = styles();
  const postPileFromState = useSelector(selectPostPile);
  const currentPlayerNumber = useSelector(selectCurrentPlayerNumber);

  const handleCardClick = (cardPlayed: Card): void => {
    dispatch(setActivePostCard(cardPlayed, currentPlayerNumber));
  };

  const postPile = postPileFromState.map((card: Card, index: number) => (
    <CardComponent key={index} handleClick={handleCardClick} card={{ ...card }} />
  ));

  console.log(postPileFromState)
  return (
    <div className={classes.mainContainer}>
      <CommonLabel customStyles={labelStyle} label="Post Pile" />
      <div className={classes.postPileContainer}>
        {postPileFromState && postPile}
      </div>
    </div>
  )
};
