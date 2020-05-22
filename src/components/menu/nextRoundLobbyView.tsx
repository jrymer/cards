import React from 'react';
import { useSelector } from 'react-redux';
import { selectGameScore } from 'store/game/selectors';
import styled from 'styled-components';

const StartButton = styled.button`
  background-color: 'green';
  border: solid black;
`;

export const NextRoundLobby: React.FC = () => {
    const score = useSelector(selectGameScore);

    const handleStartNextRound = () => {

    };

    const renderScore = () => {
        if (score) {
            return Object.keys(score).map((playerId: string) => (
                <div key={playerId}>
                    {playerId}: {score[playerId]}
                </div>
            ));
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