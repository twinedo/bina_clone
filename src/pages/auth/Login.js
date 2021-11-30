import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {IconButton, TextInput} from 'react-native-paper';
import Button from '../../components/button/Button';
import {
  BLACK,
  GRAY1,
  GRAY2,
  GRAY3,
  GRAYBG1,
  PRIMARY,
  WHITE,
} from '../../styles/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextRegular, TextBold} from '../../styles/TextStyles';
import {AppContext} from '../../services/context/Context';
import Input from '../../components/input/Input';
import {_onLinkClick} from '../../services/utils/Constants';
import {CS_BINA} from '@env';
import messaging from '@react-native-firebase/messaging';
import {UpdateUser} from '../../services/handler/AuthHandler';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {state, func} = useContext(AppContext);
  const {authContext} = func;
  const {authState} = state;

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const _login = () => {
    console.log('clicked');
    setLoading(true);
    authContext
      .signIn(email, password)
      .then(res => {
        console.log('res login', res);
        messaging()
          .getToken()
          .then(fcmToken => {
            console.log('get token FCM ', fcmToken);
            UpdateUser(res.id, fcmToken);
          })
          .catch(error => console.log('err fcmtoken', error));
        setLoading(false);
      })
      .catch(err => {
        console.log('errornya', err);
        if (err === 404) {
          alert('Email/No Telpon atau Password tidak ditemukan');
        }
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled">
        <View style={styles.body}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('assets/images/logo-notext.png')}
              style={styles.logo}
            />
            <TextBold style={styles.txtWelcome}>selamat datang!</TextBold>
          </View>
          <View>
            <TextBold style={{color: GRAY3}}>no-telp / email</TextBold>
            <Input
              onChangeText={v => setEmail(v)}
              placeholder="0812345670"
              value={email}
            />
            <TextBold style={{color: GRAY3}}>password</TextBold>
            <Input
              secureTextEntry={showPassword ? false : true}
              placeholder="password"
              value={password}
              onChangeText={v => setPassword(v)}
              iconRight={
                showPassword ? (
                  <MaterialCommunityIcons
                    name="eye-off-outline"
                    onPress={() => setShowPassword(!showPassword)}
                    color={GRAY2}
                    size={24}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="eye-outline"
                    onPress={() => setShowPassword(!showPassword)}
                    color={GRAY2}
                    size={24}
                  />
                )
              }
            />
          </View>
          <View>
            <Button
              disabled={loading ? true : false}
              onPress={_login}
              text={
                loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  'masuk'
                )
              }
              textAlign="center"
              backgroundColor={PRIMARY}
              textColor={WHITE}
              borderColor={GRAY1}
            />
            <TextBold style={styles.txtProblem}>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: WHITE},
  scrollView: {
    flexGrow: 1,
    backgroundColor: WHITE,
  },
  logo: {width: 120, height: 120},
  body: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: 30,
  },
  txtWelcome: {fontSize: 25, color: GRAY3},
  txtProblem: {textAlign: 'center', marginVertical: 10},
});
