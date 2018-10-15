import { createStackNavigator } from 'react-navigation';
import HomeComp from './HomeComp';
import SessionList from './SessionList';
import SpeakerList from './SpeakerList';

export default Navigator = createStackNavigator (
    {
      Home: {
        screen: HomeComp,
      },
      SessionList: {
        screen: SessionList,
      },
      SpeakerList: {
        screen: SpeakerList,
      },
    },
    {
        initialRouteName: 'Home',
        navigationOptions: {
            headerStyle: {
              backgroundColor: '#bf5022',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
        },
    },
);
  