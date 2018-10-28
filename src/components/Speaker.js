import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';

import { imageServerUrl } from '../api';

class Speaker extends Component {
  static navigationOptions = {
    title: 'Présentateur'
  };

  constructor(props) {
    super(props);
    this.speakerId = this.props.navigation.getParam('speakerId', '-1');
  }

  renderSessions(sessions) {
    return sessions.map(session => (
      <TouchableOpacity
        key={session.sessionId}
        style={styles.session}
        onPress={() =>
          this.navigation.navigate('Session', {
            sessionId: session.sessionId
          })
        }
      >
        <Text style={styles.sessionText}>
          - {session.short_name || session.full_name}
        </Text>
      </TouchableOpacity>
    ));
  }

  render() {
    const windowWidth = Dimensions.get('window').width;
    const { sessionContainer, speakerContainer } = this.props;

    if (this.speakerId < 0) {
      return (
        <View style={styles.container}>
          <Text h1>Invalid speaker ID</Text>
        </View>
      );
    }

    const speaker = speakerContainer.getSpeaker(this.speakerId);

    if (!speaker) {
      return (
        <View style={styles.container}>
          <Text h1>Speaker not found: {this.speakerId}</Text>
        </View>
      );
    }

    let sessions = sessionContainer
      .getSessionsKeys()
      .map(sid => sessionContainer.getSession(sid))
      .filter(
        s =>
          s.speakers &&
          (s.speakers.includes(speaker.speakerId) ||
            s.speakers.includes(`${speaker.speakerId}`)) // This Api is really weird...
      );

    return (
      <ScrollView style={{ backgroundColor: '#3d4746' }}>
        <View style={styles.container}>
          <Text style={styles.title}>{speaker.name}</Text>
          <Image
            style={{
              width: windowWidth - 48,
              height: '100%',
              backgroundColor: 'white'
            }}
            source={{ uri: `${imageServerUrl}${speaker.speakerPhotoPath}` }}
          />
          <Text style={styles.description}>{speaker.bio}</Text>
          <View style={styles.sessions}>{this.renderSessions(sessions)}</View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '700'
  },
  description: {
    marginTop: 10,
    color: '#ccc'
  },
  sessions: {
    flex: 1,
    marginTop: 25,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  session: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  sessionText: {
    marginLeft: 15,
    fontSize: 20,
    color: '#fff'
  }
});

const mapStateToProps = state => ({
  sessionContainer: state.sessions.sessionContainer,
  speakerContainer: state.speakers.speakerContainer
});

export default connect(
  mapStateToProps,
  null
)(Speaker);
