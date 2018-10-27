import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { Button, Text, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  fetchSpeakers,
  rehydrateSpeakers
} from '../redux/state/speakers/index';
import {
  fetchSessions,
  rehydrateSessions
} from '../redux/state/sessions/index';
import {
  fetchSchedule,
  rehydrateSchedule
} from '../redux/state/schedule/index';

class HomeComp extends Component {
  static navigationOptions = {
    title: 'DevFest Nantes 2018'
  };

  onSessionButtonClicked() {
    this.props.navigation.navigate('SessionList');
  }

  onSpeakerButtonClicked() {
    this.props.navigation.navigate('SpeakerList');
  }

  onPhoneInfoButtonClicked() {
    this.props.navigation.navigate('DeviceInfos');
  }

  componentDidMount() {
    if (!this.props.speakersLoaded) {
      this.props.dispatch(fetchSpeakers());
    } else {
      console.log('speakers loaded from phone memory');
      this.props.dispatch(rehydrateSpeakers(this.props.speakersJsonStr));
    }

    if (!this.props.sessionsLoaded) {
      this.props.dispatch(fetchSessions());
    } else {
      console.log('sessions loaded from phone memory');
      this.props.dispatch(rehydrateSessions(this.props.sessionJsonStr));
    }

    if (true /* Cache is not working properly !this.props.timeSlotsLoaded*/) {
      this.props.dispatch(fetchSchedule());
    } else {
      console.log('schedules loaded from phone memory');
      console.log(this.props.scheduleJsonStr);
      this.props.dispatch(rehydrateSchedule(this.props.scheduleJsonStr));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/devfest_logo.png')}
          style={styles.logo}
        />
        <Button
          title="Voir les sessions"
          icon={
            <Image
              source={require('../../assets/planet1_logo.png')}
              style={styles.planet1_logo}
            />
          }
          buttonStyle={{
            backgroundColor: '#bf5022',
            width: 300,
            height: 45,
            borderColor: '#ffffff',
            borderRadius: 100,
            borderWidth: 0,
            elevation: 0
          }}
          onPress={this.onSessionButtonClicked.bind(this)}
        />
        <Button
          title="Voir les présentateurs"
          icon={
            <Image
              source={require('../../assets/planet2_logo.png')}
              style={styles.planet1_logo}
            />
          }
          buttonStyle={{
            marginTop: 25,
            backgroundColor: '#bf5022',
            width: 300,
            height: 45,
            borderColor: '#ffffff',
            borderRadius: 100,
            borderWidth: 0,
            elevation: 0
          }}
          onPress={this.onSpeakerButtonClicked.bind(this)}
        />
        <Button
          title="Informations du téléphone"
          icon={
            <Image
              source={require('../../assets/planet2_logo.png')}
              style={styles.planet1_logo}
            />
          }
          buttonStyle={{
            marginTop: 25,
            backgroundColor: '#bf5022',
            width: 300,
            height: 45,
            borderColor: '#ffffff',
            borderRadius: 100,
            borderWidth: 0,
            elevation: 0
          }}
          onPress={this.onPhoneInfoButtonClicked.bind(this)}
        />
      </View>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3d4746'
  },
  logo: {
    width: windowWidth * 0.75,
    resizeMode: 'contain'
  },
  planet1_logo: {
    width: 35,
    resizeMode: 'contain'
  }
});

const mapStateToProps = state => {
  return {
    timeSlotsLoaded: state.schedule.loaded,
    speakersLoaded: state.speakers.speakersLoaded,
    sessionsLoaded: state.sessions.sessionsLoaded,
    speakersJsonStr: state.speakers.speakersJsonStr,
    sessionJsonStr: state.sessions.sessionJsonStr,
    scheduleJsonStr: state.schedule.scheduleJsonStr
  };
};

export default connect(
  mapStateToProps,
  null
)(HomeComp);
