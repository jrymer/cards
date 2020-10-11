import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';

import { store } from './redux';
import MainRoutes from './Routes';
import { CssBaseline } from '@material-ui/core';
import theme from './theme';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <MainRoutes />
    </Provider>
  </ThemeProvider>
);

export default App;