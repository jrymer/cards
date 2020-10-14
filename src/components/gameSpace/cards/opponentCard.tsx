import { makeStyles } from '@material-ui/core';
import { Card, PlayerImages } from 'models/card';
import React from 'react';
import { colorTransformer } from 'utils/colorTransformer';
import { getImage } from 'utils/imageFunctions';

interface CardProps {
    card: Card;
    image: PlayerImages;
}
const imageSizeDefault = 75;

const styles = makeStyles(() => ({
    topRight: {
        alignSelf: 'flex-end',
        justifySelf: 'flex-start'
    },
    bottomLeft: {
        alignSelf: 'flex-start',
        justifySelf: 'flex-end'
    }
}));

/**
 * Renders a card with a number and colored background
 *
 * @param {Card} {card} Card object with color and number value
 */
export const OpponentCard: React.FC<CardProps> = ({ card, image }) => {
    const classes = styles();
    const { color, cardValue } = card;
    const style: React.CSSProperties = {
        height: imageSizeDefault,
        width: imageSizeDefault,
        padding: 4,
        margin: 15,
        borderRadius: 10,
        boxShadow: '10px 5px 10px rgba(0, 0, 0, 0.4)',
        backgroundColor: colorTransformer(color),
        backgroundImage: `url(${getImage(image)})`,
        backgroundSize: '55% 55%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 'large'
    };

    return (
        <div style={style}>
            <span className={classes.topRight}>{cardValue}</span>
            <span className={classes.bottomLeft}>{cardValue}</span>
        </div>
    )
}
