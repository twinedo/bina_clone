import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Coin from '../coin/Coin';
import PropTypes from 'prop-types';
import {BLACK, SECONDARY} from '../../styles/Colors';
import {useNavigation} from '@react-navigation/native';

const HeaderHome = props => {
  const navigation = useNavigation();
  return (
    <View style={cssHeader.Header}>
      <View style={cssHeader.HeaderContent1}>
        <Text style={cssHeader.HeaderContent1Txt1}>Selamat Datang</Text>
        <Text style={cssHeader.HeaderContent1Txt2}>{props.userName}</Text>
      </View>
      <View style={cssHeader.HeaderContent2}>
        <Coin
          onPress={() => navigation.navigate('BinaModal')}
          text="Bina Modal"
          source={require('../../assets/images/binaModal.png')}
        />
        <Coin
          onPress={() => navigation.navigate('Komunitas')}
          text="Komunitas"
          source={require('../../assets/images/komunitas.png')}
        />
      </View>
      <View style={cssHeader.conSideImg}>{props.userPicture}</View>
    </View>
  );
};

HeaderHome.propTypes = {
  userName: PropTypes.string,
  userPicture: PropTypes.element,
};

const cssHeader = StyleSheet.create({
  Header: {
    // borderWidth: 1,
    // borderColor: 'red',
    flexDirection: 'column',
    width: '100%',
  },
  HeaderContent1: {
    maxWidth: '100%',
    // borderWidth: 1,
    // borderColor: 'blue',
    paddingVertical: 16,
    paddingLeft: 24,
    paddingRight: '35%',
  },
  HeaderContent2: {
    maxWidth: '100%',
    backgroundColor: SECONDARY,
    paddingVertical: 16,
    paddingRight: '35%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  HeaderContent1Txt1: {
    fontSize: 10,
    color: BLACK,
  },
  HeaderContent1Txt2: {
    fontSize: 24,
    color: BLACK,
    fontWeight: '700',
  },

  conSideImg: {
    position: 'absolute',
    right: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height: '100%',
    // borderWidth: 1,
    marginRight: 8,
  },
});

export default HeaderHome;
