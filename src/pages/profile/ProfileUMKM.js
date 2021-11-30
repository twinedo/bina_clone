/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import Toolbar from '../../components/toolbar/Toolbar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  GRAY1,
  GRAY2,
  GRAY3,
  PRIMARY,
  SECONDARY,
  WHITE,
} from '../../styles/Colors';
import {TextBold} from '../../styles/TextStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CardProfile from '../../components/cards/CardProfile';
import Button from '../../components/button/Button';
import {AppContext} from '../../services/context/Context';
import {useNavigation} from '@react-navigation/core';
import moment from 'moment';

const ProfileUMKM = ({route}) => {
  const {state, func} = useContext(AppContext);
  const {authState} = state;

  const {authContext} = func;

  const navigation = useNavigation();

  const {item} = route.params;
  // console.log('itemmmdawd', item);
  // console.log('authState', authState.dataSignIn.id);

  const dataChat = {
    receiverUserId: authState.dataSignIn.id,
    umkmId: item?.id,
  };

  return (
    <View style={styles.container}>
      <Toolbar
        title="Profile UMKM"
        iconRight={<Ionicons name="list" size={24} />}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: SECONDARY,
                alignItems: 'center',
                paddingBottom: 20,
                marginTop: 100,
              }}>
              <Image
                source={require('../../assets/images/HomeUmkmLogo.png')}
                style={{marginTop: -70, width: 250, height: 150}}
                resizeMode="contain"
              />
              <View>
                <TextBold style={{fontSize: 25, color: GRAY3}}>
                  {item?.DetailUser.namaLengkap}
                </TextBold>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons
                    name="fastfood"
                    size={16}
                    style={{marginRight: 4}}
                  />
                  <TextBold>{item?.DetailUser.kategoriUsaha}</TextBold>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons
                    name="location-on"
                    size={16}
                    style={{marginRight: 4}}
                  />
                  <TextBold>{item?.DetailUser.lokasiUsaha}</TextBold>
                </View>
              </View>
            </View>
            <View
              style={{
                // borderWidth: 1,
                paddingHorizontal: 20,
                paddingVertical: 15,
                flex: 1,
              }}>
              <CardProfile
                title="Nama Pengusaha"
                text={item?.DetailUser.namaLengkap}
              />
              <CardProfile title="Alamat" text={item?.DetailUser.lokasiUsaha} />
              <CardProfile title="Email" text={item?.DetailUser.email} />
              <CardProfile
                title="Status Pernikahan"
                text={item?.DetailUser.statusPernikahan}
              />
              <CardProfile
                title="Izin Usaha"
                text={`NIB: ` + item?.DetailUser.NIB}
              />
              <CardProfile
                title="Tahun Berdiri"
                text={moment(item?.DetailUser.createdAt).format('YYYY')}
              />
            </View>
            {authState.dataSignIn.role === 'Mentor' && (
              <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
                <Button
                  text="Chat"
                  textAlign="center"
                  backgroundColor={PRIMARY}
                  textColor={WHITE}
                  borderColor={GRAY1}
                  fontSize={16}
                  onPress={() =>
                    navigation.navigate('ChatRoom', {data: dataChat})
                  }
                />
              </View>
            )}
          </View>
          <View
            style={{
              paddingHorizontal: 25,
              paddingVertical: 15,
            }}>
            <Button
              text="LOGOUT"
              textAlign="center"
              fontSize={16}
              backgroundColor={WHITE}
              textColor={GRAY2}
              borderColor={GRAY1}
              onPress={() => authContext.signOut()}
            />
          </View>
        </>
      </ScrollView>
    </View>
  );
};

export default ProfileUMKM;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
