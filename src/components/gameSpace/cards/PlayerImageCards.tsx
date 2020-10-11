import React from 'react';

import { PlayerImages } from 'models/card';
import { getImage } from 'utils/imageFunctions';

interface Props {
    backgroundColor?: string;
    disabled?: boolean;
    height?: number;
    onClick?: () => void;
    source: PlayerImages;
    width?: number;
}

const imageSizeDefault = 200;

const PlayerImageCard: React.FC<Props> = (({
    disabled = false,
    backgroundColor,
    height = imageSizeDefault,
    onClick,
    source,
    width = imageSizeDefault
}) => {

    const style: React.CSSProperties = {
        padding: 10,
        margin: 15,
        borderRadius: 25,
        boxShadow: '10px 5px 10px rgba(0, 0, 0, 0.4)',
        background: backgroundColor,
        opacity: disabled && 0.3,
        cursor: !disabled && 'pointer'
    }

    return (
        <div style={style}  onClick={disabled ? () => {} : onClick}>
            <img alt={source} height={height} width={width} src={getImage(source)} />
        </div>
    );
});

export default PlayerImageCard;
