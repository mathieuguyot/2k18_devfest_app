import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';

import { imageServerUrl } from '../api';

const AVATAR_SIZE = 60;

class Session extends Component {
  static navigationOptions = {
    title: 'Session'
  };

  constructor(props) {
    super(props);
    this.sessionId = props.navigation.getParam('sessionId', '-1');
    this.navigation = props.navigation;
  }

  renderSpeakers(speakers) {
    return speakers.map(speaker => (
      <TouchableOpacity
        key={speaker.speakerId}
        style={styles.speaker}
        onPress={() =>
          this.navigation.navigate('Speaker', {
            speakerId: speaker.speakerId
          })
        }
      >
        <Avatar
          height={AVATAR_SIZE}
          width={AVATAR_SIZE}
          rounded
          source={{ uri: `${imageServerUrl}${speaker.speakerPhotoPath}` }}
        />
        <Text style={styles.speakerName}>{speaker.name}</Text>
      </TouchableOpacity>
    ));
  }

  render() {
    const { sessionContainer, speakerContainer } = this.props;

    if (this.sessionId < 0) {
      return (
        <View style={styles.container}>
          <Text h1>Invalid session ID</Text>
        </View>
      );
    }

    const session = sessionContainer.getSession(this.sessionId);

    if (!session) {
      return (
        <View style={styles.container}>
          <Text h1>Session not found: {this.sessionId}</Text>
        </View>
      );
    }

    let speakers = [];
    if (session.speakers) {
      speakers = session.speakers.map(id => speakerContainer.getSpeaker(id));
    }

    return (
      <ScrollView style={{ backgroundColor: '#3d4746' }}>
        <View style={styles.container}>
          <Text style={styles.title}>{session.full_title}</Text>
          <Text style={styles.description}>{session.description}</Text>
          <View style={styles.speakers}>{this.renderSpeakers(speakers)}</View>
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
  speakers: {
    flex: 1,
    marginTop: 25,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  speaker: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  speakerName: {
    marginLeft: 15,
    fontSize: 20,
    color: '#fff'
  }
});

const mapStateToProps = state => {
  return {
    sessionContainer: state.sessions.sessionContainer,
    speakerContainer: state.speakers.speakerContainer
  };
};

export default connect(
  mapStateToProps,
  null
)(Session);
