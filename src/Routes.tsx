import { Board } from 'components/gameSpace/board';
import { MenuContainer } from 'components/menu/menuContainer';
import { PlayerSelect } from 'components/menu/playerSelectView';
import React from 'react';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';


const MainContentContainer = styled.div`
    width: 100%;
    overflow-x: auto;
`;
const Button = styled.button`
  border: solid black;
`;

const MainRoutes: React.FC = () =>
    <MainContentContainer>
        <Button><Link to="/">Home</Link></Button>
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
    </MainContentContainer>;

export default MainRoutes;