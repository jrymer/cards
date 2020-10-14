import CommonLabel from 'components/common/Label';
import { CardComponent } from 'components/gameSpace/cards/card';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveBlitzCard } from 'store/players/actions';
import { selectCurrentPlayerNumber, selectTopCardFromBlitzDeck } from 'store/players/selectors';

const labelStyle: React.CSSProperties = {
  alignSelf: 'flex-start',
  margin: 15
};

export const BlitzDeck: React.FC = () => {
  const dispatch = useDispatch();
  const topCard = useSelector(selectTopCardFromBlitzDeck);
  const currentPlayerNumber = useSelector(selectCurrentPlayerNumber);

  const handleTopCardClicked = (): void => {
    dispatch(setActiveBlitzCard(topCard, currentPlayerNumber));
  };

  return (
    <div>
      <CommonLabel customStyles={labelStyle} label="Blitz Pile" />
      <CardComponent handleClick={handleTopCardClicked} card={{...topCard}}/>
    </div>
  )
};

