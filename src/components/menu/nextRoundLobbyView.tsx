import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startNewRound } from 'store/game/operations';
import { ScoreMap } from 'store/players';
import { selectPlayersScoreMap } from 'store/players/selectors';
import styled from 'styled-components';

const StartButton = styled.button`
  background-color: 'green';
  border: solid black;
`;

export const NextRoundLobby: React.FC = () => {
    const gameScore: ScoreMap[] = useSelector(selectPlayersScoreMap);
    const dispatch = useDispatch();

    const handleStartNextRound = (): void => {
        dispatch(startNewRound());
    };

    const renderScore = (): React.ReactNode => {
        if (gameScore) {
            return gameScore.map((scoreMap: ScoreMap) => {
                const { playerNumber, score } = scoreMap;
                return (
                    <div key={playerNumber}>
                        {playerNumber}: {score}
                    </div>
                );
            });
        }
    }

    return (
        <>
            Next Round lobby
            <StartButton onClick={handleStartNextRound}>START NEXT ROUND</StartButton>
            <div>
                Score
                {renderScore()}
            </div>
        </>
    )
}