import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const styles = makeStyles(() => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        margin: 80,
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

const Contact: React.FC = () => {
    const classes = styles();
    return (
        <div className={classes.root}>
            <Typography variant="body1">
                Contact me for feedback, improvements, and questions at 
            </Typography>
        </div>
    );
};

export default Contact;
