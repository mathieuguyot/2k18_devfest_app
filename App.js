import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeComp from './components/HomeComp';
import { Header } from 'react-native-elements';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor= '#bf5022'
          leftComponent={{ text: 'DEVFEST', style: { color: '#fff' } }}
          rightComponent={{ icon: 'menu', color: '#fff' }}
        />
        <HomeComp />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3d4746'
  },
});
