import React from 'react';
import { Provider } from 'react-redux';

import { store } from './redux';

export class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
          <div>
            hi
          </div>
      </Provider>
    );
  }
}
