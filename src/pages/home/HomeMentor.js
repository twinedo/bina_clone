/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  StatusBar,
  Pressable,
  ScrollView,
} from 'react-native';
import {AppContext} from 'services/context/Context';
import Button from '../../components/button/Button';
import Card1 from '../../components/cards/CardColumn';
import HeaderHome from '../../components/home/HeaderHome';

import {GRAY1, GRAY2, PRIMARY, WHITE} from '../../styles/Colors';
import {TextBold, TextSemiBold} from '../../styles/TextStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {_onLinkClick} from '../../services/utils/Constants';
import {GetListUMKMbyMentor} from '../../services/handler/UmkmHandler';
import {useState} from 'react';
import {CS_BINA} from '@env';

const HomeMentor = () => {
  const navigation = useNavigation();
  const {state, func} = useContext(AppContext);
  const {authState, userState} = state;

  const DATA_CARD = [
    {
      id: '124an',
      name: 'Kedai Kopi Kita',
      picture: require('../../assets/images/HomeUmkmLogo.png'),
    },
    {
      id: '124adfefn',
      name: 'Kedai Kopi Kamu',
      picture: require('../../assets/images/HomeUmkmLogo.png'),
    },
    {
      id: '124adwdafefn',
      name: 'Kedai Kopi Kamu',
      picture: require('../../assets/images/HomeUmkmLogo.png'),
    },
  ];

  const [listUMKM, setListUMKM] = useState([]);

  useEffect(() => {
    GetListUMKMbyMentor(authState?.dataSignIn?.id)
      .then(res => {
        console.log('reslistttt', res);
        setListUMKM(res);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={WHITE} barStyle="dark-content" />

      <HeaderHome
        userName="Mentor"
        userPicture={
          <Pressable
            onPress={() =>
              navigation.navigate('ProfileMentor', {
                item: authState?.dataSignIn,
              })
            }>
            <Image
              style={styles.sideImg}
              source={require('../../assets/images/FotoProfil.png')}
              resizeMode="contain"
            />
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.body}>
          <View style={styles.section1}>
            <TextBold>UMKM Binaan</TextBold>
            <TextSemiBold onPress={() => navigation.navigate('ListUMKM')}>
              {' '}
              lihat semua
            </TextSemiBold>
          </View>
          <View style={{marginBottom: 20}}>
            <FlatList
              data={listUMKM}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      marginLeft: 6,
                      marginRight: 10,
                      marginVertical: 10,
                    }}>
                    <Card1
                      onPress={() =>
                        navigation.navigate('ProfileUMKM', {item: item})
                      }
                      source={DATA_CARD[0].picture}
                      text={item?.DetailUser.namaLengkap}
                    />
                  </View>
                );
              }}
            />
          </View>
          <Button
            text="chat list"
            textAlign="center"
            backgroundColor={PRIMARY}
            textColor={WHITE}
            borderColor={GRAY1}
            onPress={() => navigation.navigate('ChatList')}
          />
        </View>
        <View
          style={{
            // margin: 24
            marginVertical: 15,
            marginHorizontal: 25,
          }}>
          <TextBold style={{textAlign: 'center', marginBottom: 10}}>
            Anda menemukan kendala?
          </TextBold>
          <Button
            onPress={() => _onLinkClick(CS_BINA)}
            iconLeft={
              <MaterialIcons name="contact-phone" color={GRAY1} size={24} />
            }
            text="hubungi CS Bina"
            textAlign="center"
            fontSize={16}
            backgroundColor={WHITE}
            textColor={GRAY2}
            borderColor={GRAY1}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: WHITE,
  },
  sideImg: {
    marginTop: -50,
    maxWidth: 87,
    maxHeight: 87,
  },
  body: {
    flex: 1,
    padding: 24,
    flexDirection: 'column',
  },
  section1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default HomeMentor;
