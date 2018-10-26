import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Expo from 'expo';
import { NetInfo } from 'react-native';
import { Platform } from 'react-native';

import { fetchSpeakers } from '../redux/state/speakers/index';
import { fetchSessions } from '../redux/state/sessions/index';
import { fetchSchedule } from '../redux/state/schedule/index';


class DeviceInfos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deviceConnectionTypeMain: "",
            deviceConnectionTypeDetail: ""
        };
        this.deviceOS = Platform.OS;
        this.deviceOSVersion = Platform.Version;
        this.deviceName = Expo.Constants.deviceName;
        this.deviceUUID = Expo.Constants.deviceId;
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            this.setState({
                deviceConnectionTypeMain: connectionInfo.type,
                deviceConnectionTypeDetail: connectionInfo.effectiveType,
            });
        });
    }
    
    static navigationOptions = {
        title: 'Informations',
    };

    onDataUpdateButtonClicked() {
        this.props.dispatch(fetchSpeakers());
        this.props.dispatch(fetchSessions());
        this.props.dispatch(fetchSchedule());
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Plateforme : {this.deviceOS}
                </Text>
                <Text style={styles.text}>
                    Version : {this.deviceOSVersion}
                </Text>
                <Text style={styles.textSmall}>
                    UUID : {this.deviceUUID}
                </Text>
                <Text style={styles.text}>
                    Modèle : {this.deviceName}
                </Text>
                <Text style={styles.text}>
                    Connection : {this.state.deviceConnectionTypeMain} ({this.state.deviceConnectionTypeDetail})
                </Text> 
                <Button 
                    title='Mettre a jour les données'
                    icon={
                    <Image
                        source={require('../../assets/planet2_logo.png')}
                        style={styles.logo}
                    />
                    }
                    buttonStyle={{
                        marginTop: 25,
                        backgroundColor: '#bf5022',
                        width: 300,
                        height: 45,
                        borderColor: "#ffffff",
                        borderRadius: 100,
                        borderWidth: 0,
                        elevation: 0,
                    }}
                    onPress={this.onDataUpdateButtonClicked.bind(this)}
                /> 
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#3d4746',
    },
    text: {
        color: 'white',
        fontSize: 25,
        textAlign: 'left'
    },
    textSmall: {
        color: 'white',
        fontSize: 15,
        textAlign: 'left'
    },
    logo: {
        width: 35,
        resizeMode: "contain",
    },
  });

export default connect(null, null)(DeviceInfos);