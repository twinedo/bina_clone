/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import Toolbar from '../../components/toolbar/Toolbar';
import {
  GRAY1,
  GRAY2,
  GRAY3,
  PRIMARY,
  SECONDARY,
  WHITE,
} from '../../styles/Colors';
import {TextBold, TextRegular} from '../../styles/TextStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppContext} from '../../services/context/Context';
import Button from '../../components/button/Button';
import AuthContext from '../../services/context/AuthContext';

const ProfileMentor = ({route}) => {
  const {func} = useContext(AppContext);
  const {authContext} = func;

  const {item} = route.params;
  // console.log('itemmmdawd', item);

  return (
    <View style={styles.container}>
      <Toolbar
        title="Profile Mentor"
        iconRight={<Ionicons name="list" size={24} />}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          <View
            style={{
              backgroundColor: SECONDARY,
              alignItems: 'center',
              paddingBottom: 20,
              marginTop: 100,
            }}>
            <Image
              source={require('../../assets/images/defaultMentorPic.png')}
              style={{
                marginTop: -70,
                width: 220,
                height: 120,
                marginBottom: 10,
              }}
              resizeMode="contain"
            />
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <TextBold style={{fontSize: 25, color: GRAY3}}>
                {item?.name}
              </TextBold>
              <TextRegular style={{fontSize: 15, color: GRAY3}}>
                {item?.role}
              </TextRegular>
            </View>
          </View>
        </View>
        <View style={{marginVertical: 15, marginHorizontal: 25}}>
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
      </ScrollView>
    </View>
  );
};

export default ProfileMentor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
