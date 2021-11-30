import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import Button from '../../components/button/Button';
import {PRIMARY, WHITE} from '../../styles/Colors';
import {TextBold, TextRegular, TextSemiBold} from '../../styles/TextStyles';

const Komunitas = () => {
  const {width, height} = Dimensions.get('screen');
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.containerPicture}>
        <View style={{width: width - 48}}>
          <Image
            source={require('../../assets/images/Teamwork.png')}
            resizeMode="cover"
            style={{width: width - 48, height: width - 48}}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextBold style={{color: PRIMARY}}>Komunitas </TextBold>
          <TextSemiBold>akan segera hadir!</TextSemiBold>
        </View>
      </View>
      <Button
        onPress={() => navigation.goBack()}
        backgroundColor={PRIMARY}
        text="kembali ke halaman utama"
        textColor={WHITE}
        textAlign="center"
        fontSize={16}
        borderColor={PRIMARY}
      />
    </View>
  );
};

export default Komunitas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  containerPicture: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
