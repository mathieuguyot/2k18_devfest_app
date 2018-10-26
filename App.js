import React from 'react';
import createStore from './src/redux';
import { Provider } from 'react-redux';
import Navigator from './src/components/Navigator';
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = createStore();

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }

}