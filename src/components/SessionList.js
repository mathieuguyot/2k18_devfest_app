import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';

const SessionListItem = ({startTime, endTime, title, speakers }) => (
  <View style={styles.sessionListItem}>
    <View style={styles.sessionItemBadge}>
      <Text style={styles.sessionItemBadgeText}>{startTime}{"\n"}{endTime}</Text>
    </View>
    <View styles={styles.sessionItemTextbox}>
      <Text style={styles.sessionItemTitle}>{title}</Text>
       <Text style={styles.sessionItemSpeakers}>
        {speakers}
      </Text>
    </View>
  </View>
);

class SessionList extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Sessions',
  };

  render() {
    let sessionsRows = [];
    for (let sessionKey of this.props.sessionContainer.getSessionsKeys()) {
      let item = this.props.sessionContainer.getSession(sessionKey);
      let itemName = item.short_title;
      if(itemName == undefined) {
        itemName = item.full_title;
      }
      let speakersNames = "";
      if(item.speakers != undefined) {
      for(let speakerId of item.speakers) {
        if(speakersNames != "") {
          speakersNames += ", "
        }
        let speaker = this.props.speakerContainer.getSpeaker(speakerId);
        speakersNames += speaker.name;
        }
      }
      let timeSlot = this.props.timeSlotContainer.getTimeSlot(sessionKey);
      let startTime = "?";
      let endTime = "?"
      if(timeSlot != undefined) {
        startTime = timeSlot.startTime;
        endTime = timeSlot.endTime;
      }
      sessionsRows.push(<SessionListItem startTime={startTime} endTime={endTime} key={sessionKey} title={itemName} speakers={speakersNames} />);
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.timeline} />
        <ScrollView>
          <View style={styles.container}>
            <View>
              {sessionsRows}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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
  sessionItemBadgeText: {
    color: '#bf5022',
    fontWeight: '900',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    paddingTop: 7
  },
  sessionItemTextbox: {
    width: 0,
    flexGrow: 1,
    flex: 1,
  },
  sessionItemTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    width: windowWidth-90,
    flexGrow: 1,
    flex: 1,
  },
  sessionItemSpeakers: {
    color: '#999',
    fontSize: 11,
  }
});

const mapStateToProps = state => {
  return {
    sessionContainer: state.sessions.sessionContainer,
    speakerContainer: state.speakers.speakerContainer,
    timeSlotContainer: state.schedule.timeSlotContainer,
  }
}

export default connect(mapStateToProps, null)(SessionList);
