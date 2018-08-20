import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  CameraRoll,
  Alert
} from 'react-native';
import { Camera, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';

class TakePictureScreen extends React.Component {

  state = {
    hasCameraPermission: null,
  };

  //componentWillMount is taking CAMERA Permissions asynchronously
  //and setting this status in a state variable
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }


  //popback to home screen
  goBack = () => {
    this.props.navigation.goBack();
  }


  //it takes the picture and save it by using CameraRoll in phone
  takePicture = async () => {
    if (this.camera) {
      const data = await this.camera.takePictureAsync();
      if (data) {
        Alert.alert(
          'Captured', ''
          [{ text: 'Ok', onPress: () => {} }],
        )
        CameraRoll.saveToCameraRoll(data.uri, 'photo');
      }
    }
  }


  //screens contains the camera view and  two buttons
  //one for taking picture  from camera and second for popback to home screen
  //if user reject the camera permission then a error will show otherwise camera view will show
  render = () => (

    <View style={styles.container}>
      {this.state.hasCameraPermission ?
        <Camera
          ref={ref => { this.camera = ref; }}
          style={{ flex: 1 }}
          type={this.state.type}>

          <Button
            onPressHandler={this.takePicture}
            buttonStyle={styles.captureButton}
            iconName={'md-camera'}/>

          </Camera>
          :
          <Text style={styles.permissionDeniedText}>Error : Access Permission Denied</Text>
        }
        <Button
          onPressHandler={this.goBack}
          buttonStyle={styles.backTouchContainer}
          iconName={'md-arrow-back'} />
        </View>
      )

    }

    //Button as a  PURECOMPONENT for optimization and reusability
    const Button = ({ onPressHandler, buttonStyle, iconName }) => (
      <TouchableOpacity
        onPress={onPressHandler}
        style={buttonStyle}>
        <Ionicons name={iconName} size={30} color="#ffffff" />
      </TouchableOpacity>
    );


    const styles = StyleSheet.create({

      permissionDeniedText: {
        alignSelf: 'center',
        fontSize: 14,
        color: '#ffffff',
        marginTop: 30,
      },
      backTouchContainer: {
        width: 50,
        height: 50,
        position: 'absolute',
        alignSelf: 'flex-start',
        bottom: 15,
        left: 20,
      },
      container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#a9a9a9'
      },
      captureButton: {
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
      },
    });

    export default TakePictureScreen;
