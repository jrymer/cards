import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

type Variant = 'contained' | 'outlined';

interface Props {
    disabled?: boolean;
    color?: string;
    onClick: () => void;
    title: string;
    variant?: Variant;
    width?: number;
}
interface CustomMuiProps {
    width: number;
    color: string;
}

const styles = makeStyles(() => ({
    buttonContainer: ((props: CustomMuiProps) => ({
        margin: 5,
        width: props.width,
        
    })),
    buttonWithColor: ((props: CustomMuiProps) => ({
        background: props.color,
        '&:hover': {
            opacity: '85%',
            background: props.color
        }
    }))
}));

const CommonButton: React.FC<Props> = (({ color, disabled = false, onClick, title, variant = 'contained', width = 250 }) => {
    const classes = styles({ width, color });

    return (
        <div className={classes.buttonContainer}>
            <Button className={color && classes.buttonWithColor} color="primary" disabled={disabled} fullWidth={true} onClick={onClick} variant={variant}>{title}</Button>
        </div>
    )
});

export default CommonButton;
