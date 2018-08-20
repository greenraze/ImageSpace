import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import { Constants } from 'expo';

class TakePictureScreen extends React.Component {

  render = () => (
    <View style={styles.container}>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#a9a9a9'
  },

});

export default TakePictureScreen;
