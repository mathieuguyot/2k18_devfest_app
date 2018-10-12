import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';

const SessionListItem = ({ title, speakers }) => (
  <View style={styles.sessionListItem}>
    <View style={styles.sessionItemBadge}>
      <Text style={styles.sessionItemBadgeText}>12:30</Text>
    </View>
    <View styles={styles.sessionItemTextbox}>
      <Text style={styles.sessionItemTitle}>{title}</Text>
      <Text style={styles.sessionItemSpeakers}>
        {speakers.map(s => s.name).join(', ')}
      </Text>
    </View>
  </View>
);

const SessionList = ({ sessions }) => (
  <View style={{ flex: 1 }}>
    <View style={styles.timeline} />
    <ScrollView>
      <View style={styles.container}>
        <View>
          {sessions.map(session => (
            <SessionListItem
              key={session.title}
              title={session.title}
              speakers={session.speakers}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingTop: 16
  },
  sessionItemTextbox: {
    height: 50,
    flex: 1,
    alignItems: 'flex-start'
  },
  sessionItemTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white'
  },
  sessionItemSpeakers: {
    color: '#999',
    fontSize: 13
  }
});

export default SessionList;
