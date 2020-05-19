import React from 'react';
import styled from 'styled-components';

const StartButton = styled.button`
  background-color: 'green';
  border: solid black;
`;

export const NextRoundLobby: React.FC = () => {
    
    const handleStartNextRound = () => {

    };

    return (
        <>
            Next Round lobby
            <StartButton onClick={handleStartNextRound}>START NEXT ROUND</StartButton>
        </>
    )
}