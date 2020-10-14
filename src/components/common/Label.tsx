import { makeStyles } from '@material-ui/core';
import React from 'react';

interface Props {
    label: string;
    customStyles?: React.CSSProperties
}

const styles = makeStyles(() => ({
    label: {
        fontStyle: 'italic',
        fontSize: 20,
        color: 'rgba(0, 0, 0, 0.4)',
        alignSelf: 'center'
    }
}));

const CommonLabel: React.FC<Props> = (({ label, customStyles }) => {
    const classes = styles();
    return (
        <div className={classes.label} style={customStyles}>
            {label}
        </div>
    )
});

export default CommonLabel;
