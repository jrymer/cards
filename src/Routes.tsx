import { makeStyles } from '@material-ui/core/styles';
import { Board } from 'components/gameSpace/board';
import { MenuContainer } from 'components/menu/menuContainer';
import { PlayerSelect } from 'components/menu/playerSelectView';
import React from 'react';
import { Route } from 'react-router-dom';

const styles = makeStyles(() => ({
    root: {
        height: '100%',
        width: '100%'
    }
}));

const MainRoutes: React.FC = () => {
    const classes = styles();
    return (
        <div className={classes.root}>
            <Route
                path='/' exact
                component={MenuContainer}
            />
            <Route
                path='/:gameId/players' exact
                component={PlayerSelect}
            />
            <Route
                path='/:gameId/board' exact
                component={Board}
            />
        </div>
    );
};

export default MainRoutes;