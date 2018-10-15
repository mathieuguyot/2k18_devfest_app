import { createStackNavigator } from 'react-navigation';
import HomeComp from './HomeComp';
import SessionList from './SessionList';

export default Navigator = createStackNavigator (
    {
      Home: {
        screen: HomeComp,
      },
      SessionList: {
        screen: SessionList,
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
  