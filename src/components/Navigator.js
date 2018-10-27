import { createStackNavigator } from 'react-navigation';
import HomeComp from './HomeComp';
import SessionList from './SessionList';
import SpeakerList from './SpeakerList';
import Speaker from './Speaker';
import DeviceInfos from './DeviceInfos';
import Session from './Session';

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
