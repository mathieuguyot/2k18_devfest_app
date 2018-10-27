import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';

const SessionListItem = ({
  navigation,
  sessionId,
  startTime,
  title,
  speakers,
  badge,
  link
}) => {
  let speakersDisplayed = [];
  if (speakers) {
    speakersDisplayed = speakers.map(s => s.name);
    if (speakersDisplayed.length > 2) {
      speakersDisplayed = [...speakersDisplayed.slice(0, 2), '...'];
    }
  }
  return (
    <View
      style={styles.sessionListItem}
      onPress={() => {
        navigation.navigate('Session', { sessionId });
      }}
    >
      {link &&
        (badge ? (
          <View style={styles.badgeLink} />
        ) : (
          <View style={styles.smallBadgeLink} />
        ))}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Session', { sessionId });
        }}
        style={styles.sessionTouchableItem}
      >
        {badge ? (
          <View style={styles.sessionItemBadge}>
            <Text style={styles.sessionItemBadgeText}>{startTime}</Text>
          </View>
        ) : (
          <View style={styles.sessionItemSmallBadge} />
        )}
        <View style={styles.sessionItemTextbox}>
          <Text style={styles.sessionItemTitle}>{title}</Text>
          {speakers && (
            <Text style={styles.sessionItemSpeakers}>
              {speakersDisplayed.join(', ')}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const TimeSlotSection = ({
  navigation,
  startTime,
  sessions,
  speakerContainer
}) => (
  <View style={styles.timeslotSection}>
    {sessions.map((s, i) => (
      <SessionListItem
        key={i}
        sessionId={s.sessionId}
        startTime={startTime}
        title={s.short_title || s.full_title}
        speakers={
          s.speakers
            ? s.speakers.map(id => speakerContainer.getSpeaker(id))
            : undefined
        }
        badge={i === 0}
        link={i < sessions.length - 1}
        navigation={navigation}
      />
    ))}
  </View>
);

const DaySection = ({
  navigation,
  readableDate,
  timeslots,
  sessionContainer,
  speakerContainer
}) => (
  <View style={styles.daySection}>
    <Text style={styles.dayTitle}>{readableDate}</Text>
    {timeslots.map((timeslot, i) => (
      <TimeSlotSection
        key={i}
        speakerContainer={speakerContainer}
        startTime={timeslot.startTime}
        sessions={timeslot.sessionIds.map(id =>
          sessionContainer.getSession(id)
        )}
        navigation={navigation}
      />
    ))}
  </View>
);

class SessionList extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Sessions'
  };

  render() {
    const {
      navigation,
      schedule,
      sessionContainer,
      speakerContainer
    } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#3d4746' }}>
        <ScrollView>
          <View style={styles.container}>
            {schedule.days.map(day => (
              <DaySection
                key={day.date}
                readableDate={day.readableDate}
                timeslots={day.timeslots}
                sessionContainer={sessionContainer}
                speakerContainer={speakerContainer}
                navigation={navigation}
              />
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
    padding: 24,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  daySection: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  dayTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
    marginBottom: 18
  },
  timeslotSection: {
    flex: 1,
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
    height: 72,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -2
  },
  sessionTouchableItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sessionItemBadge: {
    borderRadius: 9999,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    marginRight: 10,
    marginLeft: 3
  },
  sessionItemSmallBadge: {
    borderRadius: 9999,
    width: 10,
    height: 10,
    backgroundColor: 'white',
    marginRight: 30,
    marginLeft: 23
  },
  badgeLink: {
    position: 'absolute',
    height: 50,
    width: 2,
    top: 60,
    left: 27,
    backgroundColor: 'white'
  },
  smallBadgeLink: {
    position: 'absolute',
    height: 85,
    width: 2,
    top: 25,
    left: 27,
    backgroundColor: 'white'
  },
  sessionItemBadgeText: {
    color: '#bf5022',
    fontWeight: '900',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    paddingTop: 17
  },
  sessionItemTextbox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  sessionItemTitle: {
    fontWeight: 'bold',
    fontSize: 13,
    color: 'white'
  },
  sessionItemSpeakers: {
    color: '#999',
    fontSize: 11
  }
});

const mapStateToProps = state => {
  return {
    sessionContainer: state.sessions.sessionContainer,
    speakerContainer: state.speakers.speakerContainer,
    schedule: state.schedule.days
  };
};

export default connect(
  mapStateToProps,
  null
)(SessionList);
