import React from 'react';
import { Provider } from 'react-redux';

import { store } from './redux';
import MainRoutes from './Routes';



const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainRoutes />
    </Provider>
  );
}

export default App;