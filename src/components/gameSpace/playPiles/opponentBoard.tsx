import { makeStyles } from '@material-ui/core';
import CommonLabel from 'components/common/Label';
import { Card } from 'models/card';
import React from 'react';
import { OpponentsHands } from 'store/players';
import { OpponentCard } from '../cards/opponentCard';

interface Props {
    gridClass: string;
    opponent?: OpponentsHands;
    vertical?: boolean;
}

interface StyleProps {
    vertical: boolean;
}

const styles = makeStyles(() => ({
    mainContainer: (props: StyleProps) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: props.vertical && 'center'
    }),
    horizontal: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    vertical: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    blitzContainer: (props: StyleProps) => ({
        textAlign: 'center'
    }),
    postContainer: (props: StyleProps) => ({
        display: 'flex',
        flexDirection: 'column'
    }),
    postCards: (props: StyleProps) => ({
        display: 'flex',
        flexDirection: props.vertical ? 'column' : 'row'
    }),
}));

const OpponentBoard: React.FC<Props> = ({ gridClass, opponent, vertical = false }) => {
    const classes = styles({ vertical: vertical });

    const renderPostPile = (
        <div className={classes.postCards}>
            {opponent.postPile.map((postCard: Card) => (
                <OpponentCard
                    key={`${postCard.cardValue}-${postCard.color}`}
                    card={postCard}
                    image={opponent.playerImage}
                />
            ))}
        </div>
    );

    const flexDirection = vertical
        ? classes.vertical
        : classes.horizontal

    return (
        <div className={`${classes.mainContainer} ${gridClass}`}>
            <CommonLabel label={opponent.name} />
            <div className={flexDirection}>
                <div className={classes.blitzContainer}>
                    <CommonLabel label="Blitz" />
                    {opponent.topBlitzCard && (<OpponentCard card={opponent.topBlitzCard} image={opponent.playerImage} />)}
                </div>
                <div className={classes.postContainer}>
                    <CommonLabel label="Post" />
                    {renderPostPile}
                </div>
            </div>
        </div>
    )
}

export default OpponentBoard;
