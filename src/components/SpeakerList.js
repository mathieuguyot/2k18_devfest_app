import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';

import { imageServerUrl } from '../api';

const AVATAR_SIZE = 60;

class SpeakerList extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
  }

  static navigationOptions = {
    title: 'Présentateurs'
  };

  render() {
    const { speakerContainer } = this.props;
    const speakers = speakerContainer
      .getSpeakersKeys()
      .map(id => speakerContainer.getSpeaker(id))
      .sort((a, b) => (a < b ? -1 : 1));
    return (
      <View style={{ flex: 1, backgroundColor: '#3d4746' }}>
        <ScrollView>
          <View style={styles.container}>
            {speakers.map(speaker => (
              <View key={speaker.speakerId} style={styles.speakerItem}>
                <TouchableOpacity
                  onPress={() =>
                    this.navigation.navigate('Speaker', {
                      speakerKey: speaker.speakerId
                    })
                  }
                  style={styles.touchableItem}
                >
                  <View style={styles.speakerAvatar}>
                    <Avatar
                      width={AVATAR_SIZE}
                      height={AVATAR_SIZE}
                      source={{
                        uri: `${imageServerUrl}${speaker.speakerPhotoPath}`
                      }}
                    />
                  </View>
                  <Text style={styles.speakerName}>{speaker.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3d4746',
    padding: 24,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  speakerItem: {
    height: AVATAR_SIZE,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20
  },
  touchableItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  speakerName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  },
  speakerAvatar: {
    borderRadius: 9999,
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    overflow: 'hidden',
    marginRight: 15
  }
});

const mapStateToProps = state => {
  return {
    speakerContainer: state.speakers.speakerContainer
  };
};

export default connect(
  mapStateToProps,
  null
)(SpeakerList);
