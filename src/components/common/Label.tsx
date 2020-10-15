import { makeStyles } from '@material-ui/core';
import React from 'react';

interface Props {
    label: string;
    customStyles?: React.CSSProperties;
    fontSize?: number;
}

interface StyleProps {
    fontSize: number;
}

const styles = makeStyles(() => ({
    label: (props: StyleProps) => ({
        fontStyle: 'italic',
        fontSize: props.fontSize,
        color: 'rgba(0, 0, 0, 0.4)',
        alignSelf: 'center'
    })
}));

const CommonLabel: React.FC<Props> = (({ label, customStyles, fontSize = 20 }) => {
    const classes = styles({fontSize});
    return (
        <div className={classes.label} style={customStyles}>
            {label}
        </div>
    )
});

export default CommonLabel;
