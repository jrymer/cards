import { grey } from '@material-ui/core/colors';
import CommonLabel from 'components/common/Label';
import { PlayerImages } from 'models/card';
import React from 'react';
import { getImage } from 'utils/imageFunctions';

interface CardProps {
    image: PlayerImages;
    name: string;
    score: number;
}
const imageSizeDefault = 200;

export const ScoreCard: React.FC<CardProps> = ({
    image,
    name,
    score
}) => {
    const style: React.CSSProperties = {
        height: imageSizeDefault,
        width: imageSizeDefault,
        padding: 10,
        margin: 15,
        borderRadius: 25,
        boxShadow: '10px 5px 10px rgba(0, 0, 0, 0.4)',
        backgroundColor: grey[500],
        backgroundImage: `url(${getImage(image)})`,
        backgroundSize: '55% 55%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 'x-large'
    };

    return (
        <div style={style}>
            <CommonLabel label={name}/>
            <CommonLabel label={score.toString()}/>
        </div>
    )
}
