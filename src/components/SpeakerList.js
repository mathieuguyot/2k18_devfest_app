import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';

class SpeakerList extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Présentateurs'
  };

  render() {
    let speakersRows = [];
    for (let speakerKey of this.props.speakerContainer.getSpeakersKeys()) {
      let item = this.props.speakerContainer.getSpeaker(speakerKey);
      speakersRows.push(
        <SpeakerListItem
          props={this.props}
          speakerKey={speakerKey}
          key={speakerKey}
          speakerName={item.name}
        />
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.container}>
            <View>{speakersRows}</View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const SpeakerListItem = ({ props, speakerName, speakerKey }) => (
  <TouchableOpacity
    style={styles.sessionListItem}
    onPress={() => {
      props.navigation.navigate('Speaker', { speakerKey: speakerKey });
    }}
  >
    <View style={styles.sessionItemBadge} />
    <View styles={styles.sessionItemTextbox}>
      <Text style={styles.sessionItemTitle}>{speakerName}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3d4746',
    padding: 24,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  sessionListItem: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20
  },
  sessionItemBadge: {
    borderRadius: 9999,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    marginRight: 10,
    marginLeft: 3
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
