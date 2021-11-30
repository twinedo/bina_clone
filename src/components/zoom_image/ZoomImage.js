import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import Modal from 'react-native-modal';
import {BLACK} from '../../styles/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('screen');

const ZoomImage = props => {
  return (
    <Modal
      style={styles.m0}
      useNativeDriver
      hideModalContentWhileAnimating
      hasBackdrop={false}
      isVisible={props.isVisible}
      onBackButtonPress={props.onBackButtonPress}
      onBackdropPress={props.onBackdropPress}>
      <View style={styles.f1}>
        <View style={styles.toolbar}>
          <AntDesign
            onPress={props.onClosePress}
            name="closecircle"
            size={24}
            color={'white'}
            style={styles.closePhoto}
          />
          <AntDesign
            onPress={props.onDownloadPress}
            name="download"
            size={24}
            color={'white'}
            style={styles.downloadPhoto}
          />
        </View>
        {props.uri != null ? (
          <ReactNativeZoomableView
            maxZoom={1.5}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
            captureEvent={true}
            style={{backgroundColor: BLACK}}>
            <Image style={styles.zoomedImg} source={{uri: props.uri}} />
          </ReactNativeZoomableView>
        ) : null}
      </View>
    </Modal>
  );
};

ZoomImage.propTypes = {
  isVisible: PropTypes.bool,
  onBackButtonPress: PropTypes.func,
  onBackdropPress: PropTypes.func,
  onClosePress: PropTypes.func,
  onDownloadPress: PropTypes.func,
  uri: PropTypes.string,
};

export default ZoomImage;

const styles = StyleSheet.create({
  f1: {flex: 1, backgroundColor: BLACK},
  m0: {margin: 0},
  closePhoto: {margin: 20},
  downloadPhoto: {margin: 20},
  zoomedImg: {
    height: height - 150,
    width: width,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  toolbar: {flexDirection: 'row', justifyContent: 'space-between'},
});
