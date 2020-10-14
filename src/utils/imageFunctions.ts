import * as images from '../assets/images';

import { PlayerImages } from 'models/card';


export const getImage = (source: PlayerImages) => {
    switch (source) {
        case PlayerImages.BUCKET:
            return images.waterbucket;
        case PlayerImages.BUGGY:
            return images.carriage;
        case PlayerImages.PLOUGH:
            return images.plough;
        case PlayerImages.SPICKET:
            return images.spicket;
        case PlayerImages.BUTTER:
            return images.butter;
        case PlayerImages.BEER:
            return images.beer;
        case PlayerImages.COW:
            return images.cow;
        case PlayerImages.WINDMILL:
            return images.windmill;
        case PlayerImages.BASKET:
            return images.basket;
        case PlayerImages.WHEAT:
            return images.wheat;
    }
};
