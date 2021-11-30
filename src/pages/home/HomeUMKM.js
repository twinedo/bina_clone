/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import HeaderHome from '../../components/home/HeaderHome';
import CardMentorChat from '../../components/home/CardMentorChat';
import Card1 from '../../components/cards/CardColumn';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../../services/context/Context';
import {GetDetailUmkm, GetMateriUmkm} from '../../services/handler/UmkmHandler';
import {GRAY1, GRAY2, WHITE} from '../../styles/Colors';
import Button from '../../components/button/Button';
import {_onLinkClick} from '../../services/utils/Constants';

const HomeUMKM = () => {
  const navigation = useNavigation();

  const {state, func} = useContext(AppContext);
  const {authState, userState} = state;
  const {authContext, userContext} = func;

  const Data_User = authState.dataSignIn;

  const [materi, setMateri] = useState(null);
  console.log('materi', materi);

  console.log('userStaterasdad', userState);

  const getMateri = () => {
    if (Data_User) {
      GetMateriUmkm(Data_User.id)
        .then(res => {
          console.log('res data materi', res);
          setMateri(res);
        })
        .catch(err => {
          console.log('err', err.request);
        });
    }
  };

  useEffect(() => {
    userContext.getUserDetail(Data_User.id);
    getMateri();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
      <HeaderHome
        userName={userState?.userDetail?.DetailUser.namaLengkap}
        userPicture={
          <Pressable
            onPress={() =>
              navigation.navigate('ProfileUMKM', {
                item: userState?.userDetail,
              })
            }>
            <Image
              style={styles.sideImg}
              source={require('../../assets/images/HomeUmkmLogo.png')}
            />
          </Pressable>
        }
      />

      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.containerContent}>
          <Text style={styles.titleContent}>Materi Pelatihan</Text>

          <FlatList
            data={materi}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <View style={styles.itemWrapperMateri}>
                  <Card1
                    onPress={() => _onLinkClick(item.link)}
                    source={require('../../assets/images/E-commerce.png')}
                    text={item.name}
                  />
                </View>
              );
            }}
          />
        </View>

        <View style={styles.containerFooter}>
          <Text style={styles.titleFooter}>Mentor Anda</Text>
          <CardMentorChat
            mentorName={userState?.userDetail?.mentorName}
            mentorDeskripsi={userState?.userDetail?.mentorDeskripsi}
            mentorPicture={require('../../assets/images/FotoProfil.png')}
            onPressChat={() => navigation.navigate('ChatRoom')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // borderWidth: 1,
    flex: 1,
    backgroundColor: WHITE,
  },
  sideImg: {
    marginTop: -50,
    maxWidth: 128,
    maxHeight: 72,
  },
  containerContent: {
    paddingVertical: 16,
    paddingHorizontal: 25,
    flex: 1,
  },
  titleContent: {
    fontSize: 15,
    fontWeight: '700',
    color: '#666666',
    marginBottom: 0,
  },
  containerFooter: {
    // paddingVertical: 10,
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  titleFooter: {
    fontSize: 15,
    fontWeight: '700',
    color: '#666666',
    marginBottom: 10,
  },
  itemWrapperMateri: {
    marginLeft: 6,
    marginRight: 10,
    marginVertical: 10,
  },
});

export default HomeUMKM;
