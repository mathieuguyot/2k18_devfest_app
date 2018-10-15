import React from 'react';
import createStore from './src/redux';
import { Provider } from 'react-redux';
import Navigator from './src/components/Navigator';

const store = createStore();

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }

}