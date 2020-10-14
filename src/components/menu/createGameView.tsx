import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { createGame, joinGame, mockGame } from 'store/game/operations';
import CommonButton from 'components/common/CommonButton';

const styles = makeStyles(() => ({
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        display: 'flex',
        margin: 10
    },
    textField: {
        width: 500
    }
}));

export const CreateGameView: React.FC = () => {
    const classes = styles();
    const dispatch = useDispatch();
    const [id, setId] = React.useState<string>('');

    const handleGameIdChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setId(event.currentTarget.value);
    };
    const handleCreateGame = (): void => {
        dispatch(createGame());
    };
    const handleJoinGame = (): void => {
        dispatch(joinGame(id));
    };
    const handleMockGame = () => {
        dispatch(mockGame());
    };

    return (
        <div className={classes.container}>
            <TextField className={classes.textField} placeholder="Enter game code" name='gameId' onChange={handleGameIdChange} value={id} variant="outlined" />
            <div className={classes.buttonContainer}>
                <CommonButton disabled={id.length !== 20} onClick={handleJoinGame} title="Join Game"/>
                <CommonButton onClick={handleCreateGame} title="Create Game"/>
            </div>
            {process.env.NODE_ENV === 'development' && <CommonButton onClick={handleMockGame} title="Mock Game"/>}
        </div>
    )
}
