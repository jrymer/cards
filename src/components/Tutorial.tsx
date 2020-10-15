import { makeStyles, Typography } from '@material-ui/core';
import { TutorialImages } from 'models/tutorialImages';
import React from 'react';
import { getTutorialImage } from 'utils/imageFunctions';
import CommonLabel from './common/Label';

const styles = makeStyles(() => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        margin: 80,
        flexDirection: 'column',
        alignItems: 'center'
    },
    resources: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        width: '60%',
        marginBottom: 40
    },
    screenshots: {
        display: 'flex',
        flexDirection: 'column',
        width: '60%'
    },
    link: {
        textDecoration: 'none',
    },
    typographyMargin: {
        marginTop: 20,
        marginBottom: 20
    }
}));

const removeAlignCenter: React.CSSProperties ={
    alignSelf: 'auto'
}

const Tutorial: React.FC = () => {
    const classes = styles();
    const instructionPdfUrl = 'https://www.dutchblitz.com/wp-content/uploads/Dutch_Blitz_Directions_Web.pdf';
    const dutchBlitzUrl = 'https://www.dutchblitz.com/';
    const imageHeight = 800;
    const imageWidth = 1500;

    return (
        <div className={classes.root}>
            <CommonLabel label="How to play" fontSize={80}/>
            <div className={classes.resources}>
                <CommonLabel label="Resources" customStyles={removeAlignCenter} fontSize={40}/>
                <a className={classes.link} target="_blank" rel="noopener noreferrer" href={instructionPdfUrl}>
                    <CommonLabel label="Manual" />
                </a>
                <a className={classes.link} target="_blank" rel="noopener noreferrer" href={dutchBlitzUrl}>
                    <CommonLabel label="Dutch Blitz" />
                </a>
            </div>
            <div className={classes.screenshots}>
                <CommonLabel label="How to use the app" customStyles={removeAlignCenter} fontSize={40}/>
                <Typography className={classes.typographyMargin} variant="body1">
                    Firstly, familiarize youreself with the offical rules by reading the rules listed under the Manual section of this page. After you have an understand of the basics of Dutch Blitz, examine the screenshots below. The app is setup similar to how one would setup the card game, the wood pile on the right, post pile in the middle, and blitz pile to the left. The dutch piles are in the center of the screen.
                </Typography>
                <img src={getTutorialImage(TutorialImages.MAIN)} width={imageWidth} height={imageHeight}/>
                <Typography className={classes.typographyMargin} variant="body1">
                    Above you can see the layout of the board during a two player game. Your cards on the bottom row, and you can view your opponent&apos;s hand at the top and sides of the game board depending on the number of players. The large empty space in the center of the board is for dutch piles.
                </Typography>
                <img src={getTutorialImage(TutorialImages.ACTIVE)} width={imageWidth} height={imageHeight}/>
                <Typography className={classes.typographyMargin} variant="body1">
                    When selecting a card to play on the dutch piles, if the card is a valid card, the dutch pile container will outline itself in green. When creating a new dutch pile with a 1 card, you only need to click in the dutch pile container. If you are adding to a dutch pile, you must click on the dutch pile you want your card to be added onto.
                </Typography>
                <img src={getTutorialImage(TutorialImages.ACTIONS)} width={imageWidth} height={imageHeight}/>
                <Typography className={classes.typographyMargin} variant="body1">
                    These are the action buttons available to each player. To draw 3 cards from the wood pile, click the RE-DRAW button. If you cannot play any cards, click the SHUFFLE button. When someone has won the round, click the END ROUND button and scream BLITZ! to yourself behind your computer. This will end and score the round taking you to the post round screen where you can view each players score&apos;s and begin a new round. 
                </Typography>
            </div>
        </div>
    );
};

export default Tutorial;
