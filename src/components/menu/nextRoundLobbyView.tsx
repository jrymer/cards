import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameScore } from 'store/game';
import { startNewRound } from 'store/game/operations';
import { selectGameScore } from 'store/game/selectors';
import styled from 'styled-components';

const StartButton = styled.button`
  background-color: 'green';
  border: solid black;
`;

export const NextRoundLobby: React.FC = () => {
    const gameScore: GameScore = useSelector(selectGameScore);
    const dispatch = useDispatch();

    const handleStartNextRound = () => {
        dispatch(startNewRound());
    };

    const renderScore = () => {
        if (gameScore) {
            return Object.keys(gameScore).map((playerId: string) => {
                const { name, score } = gameScore[playerId];
                return (
                    <div key={playerId}>
                        {name}: {score}
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