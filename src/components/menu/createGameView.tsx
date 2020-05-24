import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { createGame, joinGame } from 'store/game/operations';
import styled from 'styled-components';

const Button = styled.button`
  border: solid black;
`;

export const CreateGameView: React.FC = () => {
    const dispatch = useDispatch();
    const [id, setId] = React.useState<string>('');

    const handleGameIdChange = (event: FormEvent<HTMLInputElement>): void => {
        setId(event.currentTarget.value);
    };

    const handleCreateGame = () => {
        dispatch(createGame());
    };
    const handleJoinGame = () => {
        dispatch(joinGame(id));
    }

    return (
        <>
            <input type='text' name='gameId' onChange={handleGameIdChange} value={id}></input>
            <Button onClick={handleJoinGame}>Join Game</Button>
            <Button onClick={handleCreateGame}>Create Game</Button>
        </>
    )
}
