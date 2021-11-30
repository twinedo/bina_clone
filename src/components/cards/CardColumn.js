import React from 'react';
import {Pressable, StyleSheet, View, Image, Dimensions} from 'react-native';
import {TextSemiBold} from '../../styles/TextStyles';
import PropTypes from 'prop-types';
import {GRAY3, WHITE} from '../../styles/Colors';

const {width} = Dimensions.get('window');

const Card1 = props => {
  return (
    <Pressable style={styles.container} onPress={props.onPress} {...props}>
      <View style={styles.imageWrapper}>
        <Image
          {...props}
          source={props.source}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <TextSemiBold ellipsisMode="tail" numberOfLines={1} style={styles.txt}>
        {props.text}
      </TextSemiBold>
    </Pressable>
  );
};

Card1.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.any,
  text: PropTypes.string,
};

export default Card1;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderRadius: 20,
    backgroundColor: WHITE,
    elevation: 5,
    width: width / 2.75,
    height: 168,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  imageWrapper: {flex: 1, justifyContent: 'center'},
  image: {
    // height: 72,
    width: width / 3.2,
  },
  txt: {textAlign: 'center', marginBottom: 8, color: GRAY3},
});
