import { Board } from 'components/board';
import React from 'react';
import { Provider } from 'react-redux';

import { store } from './redux';

export const App: React.Component<Props> = () => {
  return (
    <Provider store={store}>
      <Board />
    </Provider>
  );
}
