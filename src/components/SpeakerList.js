import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';

class SpeakerList extends Component {
  
  constructor(props) {
    super(props); 
  }

  static navigationOptions = {
    title: 'Présentateurs',
  };

  render() {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.timeline} />
            <ScrollView>
              <View style={styles.container}>
                <View>
                { Object.keys(this.props.speakersMap).map(function (key) {
                  let item = this.props.speakersMap[key];
                if(isNaN(key)) 
                  return;                  
              return (
                <SpeakerListItem key={key} speakerName={item.name} />
                );
            }, this)} 
              </View>
              </View>  
            </ScrollView>
        </View>
    );
  }

}

const SpeakerListItem = ({ speakerName }) => (
  <View style={styles.sessionListItem}>
    <View style={styles.sessionItemBadge}>
    </View>
    <View styles={styles.sessionItemTextbox}>
      <Text style={styles.sessionItemTitle}>{speakerName}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3d4746',
    padding: 24,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  timeline: {
    marginLeft: 50,
    width: 5,
    height: 2000,
    marginBottom: -2000,
    backgroundColor: 'white'
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
  },
});

const mapStateToProps = state => {
    return {
      speakersMap: state.speakers.speakersMap
    }
  }

export default connect(mapStateToProps, null)(SpeakerList);