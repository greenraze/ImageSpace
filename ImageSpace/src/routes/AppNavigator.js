import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
 
export default createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: () => ({
        header: null,

      })
    },
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: () => ({
        header: null
      }),
    }
  },
  {
    initialRouteName: 'LoginScreen',
  }
);
