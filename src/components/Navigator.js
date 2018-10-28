import { createStackNavigator } from 'react-navigation';
import HomeComp from './HomeComp';
import SessionList from './SessionList';
import SpeakerList from './SpeakerList';
import Speaker from './Speaker';
import DeviceInfos from './DeviceInfos';
import Session from './Session';
import NoteComp from './NoteComp';

export default (Navigator = createStackNavigator(
  {
    Home: {
      screen: HomeComp
    },
    SessionList: {
      screen: SessionList
    },
    SpeakerList: {
      screen: SpeakerList
    },
    Speaker: {
      screen: Speaker
    },
    DeviceInfos: {
      screen: DeviceInfos
    },
    Session: {
      screen: Session
    },
    Note: {
      screen: NoteComp
    }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#bf5022'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
));
