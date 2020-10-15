import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

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
                Contact me for feedback, improvements, and questions at jrymer1@gmail.com
            </Typography>
        </div>
    );
};

export default Contact;
