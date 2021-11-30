import React from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import {BLACK, WHITE} from '../../styles/Colors';
import PropTypes from 'prop-types';
import {TextBold} from '../../styles/TextStyles';

const ViewSelectedFile = props => {
  console.log('props.value', props.value);
  return (
    <View style={styles.container}>
      {props.iconLeft}
      <View style={styles.field}>
        {props.value?.type === 'image' ? (
          <View style={styles.imgFrame}>
            <Image
              source={props.value?.file}
              style={{width: '100%', height: '100%'}}
            />
            <View style={styles.badgeClose}>{props.iconClose}</View>
          </View>
        ) : (
          <View style={styles.textFrame}>
            <TextBold
              numberOfLines={1}
              ellipsisMode="tail"
              style={styles.textFile}>
              {props.value?.file?.name}
            </TextBold>
            <View style={styles.btnClose}>{props.iconClose}</View>
          </View>
        )}
      </View>
      {props.iconRight}
    </View>
  );
};

ViewSelectedFile.propTypes = {
  iconLeft: PropTypes.element,
  iconRight: PropTypes.element,
  value: PropTypes.any,
  iconClose: PropTypes.element,
};

export default ViewSelectedFile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    marginVertical: 10,
    borderColor: '#E5E5E5',
  },
  field: {
    flex: 1,
    color: BLACK,
    marginLeft: 10,
  },
  imgFrame: {
    width: 100,
    height: 100,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  badgeClose: {
    left: -20,
    width: 20,
    height: 20,
    borderRadius: 10,
    // backgroundColor: WHITE,
    alignSelf: 'flex-start',
    // justifyContent: 'flex-end',
  },
  textFrame: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingRight: 20,
    // borderWidth: 1,
  },
  textFile: {
    paddingRight: 0,
    fontSize: 14,
  },
  btnClose: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 10,
    // backgroundColor: BLACK,
  },
});
