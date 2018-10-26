import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';

export default class Speaker extends Component {

    static navigationOptions = {
        title: 'Présentateur',
      };

    constructor(props) {
        super(props);
        this.speakerKey = this.props.navigation.getParam('speakerKey', '-1');
    }

    render() {
        return(
            <View></View>
        );
    }

}