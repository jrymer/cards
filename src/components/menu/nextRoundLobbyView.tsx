import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CommonButton from 'components/common/CommonButton';
import { startNewRound } from 'store/game/operations';
import { ScoreMap } from 'store/players';
import { selectPlayersScoreMap } from 'store/players/selectors';
import CommonLabel from 'components/common/Label';
import { selectRound } from 'store/game/selectors';
import { ScoreCard } from 'components/gameSpace/cards/scoreCard';

interface Props {
    gridClass: string;
}

const styles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardsContainer: {
        display: 'flex'
    }
}));

export const NextRoundLobby: React.FC<Props> = ({ gridClass }) => {
    const classes = styles();
    const gameScore: ScoreMap[] = useSelector(selectPlayersScoreMap);
    const round = useSelector(selectRound);
    const dispatch = useDispatch();

    const handleStartNextRound = (): void => {
        dispatch(startNewRound());
    };

    const renderScores = (): React.ReactNode => {
        if (gameScore) {
            return gameScore.map((scoreMap: ScoreMap) => {
                const { totalScore, name, playerImage, playerNumber } = scoreMap;
                return (
                    <ScoreCard
                        key={playerNumber}
                        image={playerImage}
                        name={name}
                        score={totalScore}
                    />
                );
            })
        }
    }


    return (
        <div className={`${classes.container} ${gridClass}`}>
            <CommonLabel label={`End of round ${round}`} />
            <div>
                <div className={classes.cardsContainer}>
                    {renderScores()}
                </div>
            </div>
            <CommonButton onClick={handleStartNextRound} title="Start next round" />
        </div >
    );
}