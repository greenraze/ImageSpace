

import React from 'react';
import {
  CameraRoll,
  View,
  FlatList,
  StyleSheet,
  InteractionManager,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';

const NUM_COLUMNS = 3;
const PAGE_SIZE = NUM_COLUMNS * 10;
const FBCOLOR = 'rgb(59, 89, 152)';


//fetching local images and send back to component
const getImages = async params =>{
  return await new Promise((res, rej) =>
  CameraRoll.getPhotos(params)
  .then(data => {
    const assets = data.edges;
    const images = assets.map(asset => asset.node.image);
    const page_info = data.page_info;
    res({ images, page_info });
  })
  .catch(rej)
);
};

 class HomeScreen extends React.Component {

  state = {
    permission: null,
    images: null,
  };


  // fetching the images from mobile on componentDidMount
  componentDidMount() {
    this.getMoreImages();
  }


  //we are implementing the infinit scrolling by using  CameraRoll and flatlist
  //on scrolling when user reach at the end of scroll the callback call the getMoreImages
  //there is a small trick is in using  "has_next_page"and "end_cursor" provided by CameraRoll response
  //that tell is there more images in mobile? then fetch after "end_cursor" them and concat with exsisting image array
  //we are updating  the "end_cursor" and "has_next_page" after every "onEndReached" call
  getMoreImages = () => {
    InteractionManager.runAfterInteractions(async () => {
      const { end_cursor, has_next_page, images } = this.state;

      if (!has_next_page && images) {
        return;
      }

      const { images: newImages, page_info: pageInfo } = await getImages({
        first: PAGE_SIZE,
        after: end_cursor,
      });

      this.setState({
        images: (images || []).concat(newImages),
        end_cursor: pageInfo.end_cursor,
        has_next_page: pageInfo.has_next_page,
      });
    });
  };

  //render contain a list that shows the three image in a row
  render = () => (
    <View style={styles.container}>
      <List
        images={this.state.images}
        onEndReached={this.getMoreImages}
        hasMore={this.state.has_next_page}
      />
    </View>
  );
}

//List as a  PURECOMPONENT
// it takes images array for rendering and  hasMore for passing to FooterComponent
//the main thing is onEndReached
// when scroll reached its end then onEndReached callback call and load more images
const List = ({ hasMore, images, onEndReached }) => (
  <FlatList
    data={images || []}
    renderItem={({ item }) => (
      <Item uri={item.uri} />
    )}
    ListFooterComponent={<LoadingFooter hasMore={hasMore} animating={false} />}
    keyExtractor={item => item.uri}
    numColumns={NUM_COLUMNS}
    onEndReachedThreshold={0.5}
    onEndReached={onEndReached}
  />
);

//Item as a  PURECOMPONENT contain image view
const Item = ({ uri }) => (
  <TouchableOpacity style={styles.touchable}>
    <Image style={styles.image} source={{ uri }} />
  </TouchableOpacity>
);

//LoadingFooter as a  PURECOMPONENT
//it retuns "Loading more photos..." when CameraRoll is fetching images
//  and "That's all!" when there are no more  saved images
const LoadingFooter = ({ hasMore }) => (
  <View style={styles.footerContainer}>
    {hasMore && <ActivityIndicator />}
    <Text style={styles.footerText}>
      {hasMore ? 'Loading more photos...' : "That's all!"}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  captureButtonStyle: {
    width: 100,
    height: 60,
    backgroundColor: '#ffffff',
    position: 'absolute',
    borderRadius: 50,
    bottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: FBCOLOR
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#a9a9a9',
  },
  touchable: {
    flex: 1,
    aspectRatio: 1,
  },
  image: {
    flex: 1,
    margin: 1,
    backgroundColor: '#ddd',
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
  },
  footerText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#ffffff',
  },
});

export default HomeScreen;
