import React from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import PropTypes from 'prop-types';

const Coin = props => {
  return (
    <View style={styles.groupBullet}>
      <Pressable style={styles.bullet} onPress={props.onPress}>
        <Image style={styles.bulletImg} source={props.source} />
      </Pressable>
      <Text style={styles.bulletTxt}>{props.text}</Text>
    </View>
  );
};

Coin.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.any,
  text: PropTypes.string,
};

const styles = StyleSheet.create({
  groupBullet: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bullet: {
    width: 64,
    height: 64,
    backgroundColor: '#FFFFFF',
    borderRadius: 300,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
    padding: 18,
    elevation: 5,
  },
  bulletImg: {
    width: '100%',
    height: '100%',
  },
  bulletTxt: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
});

export default Coin;
