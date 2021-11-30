import React from 'react';
import {StyleSheet, Image, View, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/logo.png')}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width / 2,
    height: height / 2,
  },
});
