import * as images from 'assets/images/playerImages';
import * as tutorialImages from 'assets/images/tutorialImages';

import { PlayerImages } from 'models/card';
import { TutorialImages } from 'models/tutorialImages';


export const getPlayerImage = (source: PlayerImages): string => {
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

export const getTutorialImage = (source: TutorialImages): string => {
    switch (source) {
        case TutorialImages.ACTIONS:
            return tutorialImages.actionButtons;
        case TutorialImages.ACTIVE:
            return tutorialImages.activeCard;
        case TutorialImages.MAIN:
            return tutorialImages.mainScreen;
    }
};
