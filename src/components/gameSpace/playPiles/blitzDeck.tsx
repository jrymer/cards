import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CommonLabel from 'components/common/Label';
import { CardComponent } from 'components/gameSpace/cards/card';
import { setActiveBlitzCard } from 'store/players/actions';
import { selectCurrentPlayerImage, selectCurrentPlayerNumber, selectTopCardFromBlitzDeck } from 'store/players/selectors';

const labelStyle: React.CSSProperties = {
  alignSelf: 'flex-start',
  margin: 15
};

export const BlitzDeck: React.FC = () => {
  const dispatch = useDispatch();
  const topCard = useSelector(selectTopCardFromBlitzDeck);
  const currentPlayerNumber = useSelector(selectCurrentPlayerNumber);
  const playerImage = useSelector(selectCurrentPlayerImage);

  const handleTopCardClicked = (): void => {
    dispatch(setActiveBlitzCard(topCard, currentPlayerNumber));
  };

  return (
    <div>
      <CommonLabel customStyles={labelStyle} label="Blitz Pile" />
      {topCard && <CardComponent handleClick={handleTopCardClicked} card={{...topCard}} playerImage={playerImage}/>}
    </div>
  )
};

