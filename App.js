import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeComp from './src/components/HomeComp';
import { Header } from 'react-native-elements';
import createStore from './src/redux';
import { Provider } from 'react-redux';

const store = createStore();

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Header
            backgroundColor= '#bf5022'
            leftComponent={{ text: 'DEVFEST', style: { color: '#fff' } }}
            rightComponent={{ icon: 'menu', color: '#fff' }}
          />
          <HomeComp />
        </View>
      </Provider>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3d4746'
  },
});
