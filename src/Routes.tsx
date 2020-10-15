import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { PlayerSelect } from 'components/menu/playerSelectView';
import { Board } from 'components/gameSpace/board';
import { MenuContainer } from 'components/menu/menuContainer';
import TopBar from 'components/common/AppBar';
import Tutorial from 'components/Tutorial';
import Contact from 'components/Contact';

const styles = makeStyles(() => ({
    root: {
        height: '100%',
        width: '100%'
    },
    menuButton: {
    },
    title: {
        flexGrow: 1,
    },
}));

const MainRoutes: React.FC = () => {
    const classes = styles();
    return (
        <div className={classes.root}>
            <TopBar />
            <Switch>
                <Route
                    path='/' exact
                    component={MenuContainer}
                />
                <Route
                    path='/tutorial' exact
                    component={Tutorial}
                />
                <Route
                    path='/contact' exact
                    component={Contact}
                />
                <Route
                    path='/:gameId/players' exact
                    component={PlayerSelect}
                />
                <Route
                    path='/:gameId/board' exact
                    component={Board}
                />
            </Switch>
        </div>
    );
};

export default MainRoutes;