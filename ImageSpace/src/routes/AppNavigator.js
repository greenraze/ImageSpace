import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import TakePictureScreen from '../screens/TakePictureScreen';

//there are total three screens in app
//we are using react-navigation library for  navigation
//initial screen  is login where user can login with facebook
//after successfull login app navigate to home screen
//home screen shows the saved images fetching by using CameraRoll  in a grid view
//on home screen there is a camera button that navigate to TakePictureScreen screen
//user can take image on TakePictureScreen with camera and it will save in mobile
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
    },
    TakePictureScreen: {
      screen: TakePictureScreen,
      navigationOptions: () => ({
        header: null
      }),
    }
  },
  {
    initialRouteName: 'LoginScreen',
  }
);
