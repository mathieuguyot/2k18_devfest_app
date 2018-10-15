import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Avatar } from 'react-native-elements';

const AVATAR_SIZE = 100;

export default class Session extends Component {
  renderSpeakers(speakers) {
    return speakers.map(speaker => (
      <View key={speaker.name} style={styles.speaker}>
        <Avatar
          height={AVATAR_SIZE}
          width={AVATAR_SIZE}
          rounded
          source={{ uri: speaker.avatar_uri }}
        />
        <Text h3 style={styles.speakerName}>
          {speaker.name}
        </Text>
      </View>
    ));
  }

  render() {
    const { title, description, speakers } = this.props;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text h1>{title}</Text>
          <Text style={styles.description}>{description}</Text>
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
    paddingTop: 30,
    justifyContent: 'flex-start'
  },
  description: {
    marginTop: 10
  },
  speakers: {
    flex: 1,
    marginTop: 30,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  speaker: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30
  },
  speakerName: {
    marginLeft: 15
  }
});
