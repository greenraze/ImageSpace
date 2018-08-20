
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';

const FBCOLOR = 'rgb(59, 89, 152)';
const FACEBOOK_APP_ID = '463055107504718';

class ImagePickerModal extends React.Component {


  //we are using expo API for facebook login
  //settled the facebook provided APPID in logInWithReadPermissionsAsync method
  //get the  'type' attribute to check user successfully login

  loginWithFacebook = async () => {
    const { type } = await Expo.Facebook.logInWithReadPermissionsAsync(
      FACEBOOK_APP_ID,
      {
        permissions: ['public_profile']
      }
    );
    if (type === 'success') {
      console.log('success');
    } else {
      if (type !== 'cancel'){
        Alert.alert(
          'Failure',
          'Unable to Login'
          [{ text: 'Ok',}],
        )
      }
    }
  }

  //screen shows a textview containig ap name
  //and a button for login with facebook
  render = () => (
    <View style={styles.container}>
      <Text style={styles.appNameText}>
        IMAGE SPACE
      </Text>
      <TouchableOpacity
        style={styles.fbButton}
        onPress={this.loginWithFacebook}>
        <Text style={styles.fbButtonText} >Click To Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fbButton: {
    width: 300,
    height: 50,
    backgroundColor: FBCOLOR,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fbButtonText: {
    color: '#ffffff',
    fontSize: 20
  },
  appNameText: {
    fontSize: 40,
    color: FBCOLOR,
    width: 300,
    height: 50,
    marginBottom: 100,
    textAlign: 'center',
  }
});

export default ImagePickerModal;
