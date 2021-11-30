/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {useNavigation} from '@react-navigation/native';
import Login from 'pages/auth/Login';
import HomeUMKM from 'pages/home/HomeUMKM';
import HomeMentor from 'pages/home/HomeMentor';
import SplashScreen from 'pages/splashscreen/SplashScreen';
import {AppContext} from 'services/context/Context';
import BinaModal from 'pages/modal/BinaModal';
import Komunitas from 'pages/komunitas/Komunitas';
import ListUMKM from 'pages/home/ListUMKM';
import ProfileUMKM from 'pages/profile/ProfileUMKM';
import ChatList from 'pages/chat/ChatList';
import ChatRoom from 'pages/chat/ChatRoom';
import ProfileMentor from 'pages/profile/ProfileMentor';
import PushNotification, {Importance} from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {showNotification} from 'services/utils/localNotification';

const Stack = createStackNavigator();

const Routes = () => {
  const {state, func} = useContext(AppContext);
  const {authState} = state;
  const {authContext} = func;

  useEffect(() => {
    authContext.checkAuth();
  }, []);

  console.log('authState', authState);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage', remoteMessage);

      if (remoteMessage.data?.type === 'personal chat') {
        showNotification(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
          remoteMessage.notification.android.channelId,
        );
      }

      PushNotification.createChannel(
        {
          channelId: remoteMessage.notification.android.channelId,
          channelName: 'BinaChannel',
          importance: Importance.HIGH,
        },
        created => console.log('create channel returned', created),
      );
    });

    return () => unsubscribe;
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerMode: 'none'}}>
      {authState.isLoading ? (
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      ) : authState.token === null ? (
        <Stack.Screen name="Login" component={Login} />
      ) : (
        <>
          {authState.dataSignIn.role === 'Mentor' ? (
            <Stack.Screen name="HomeMentor" component={HomeMentor} />
          ) : (
            <Stack.Screen name="HomeUMKM" component={HomeUMKM} />
          )}
          <Stack.Screen name="BinaModal" component={BinaModal} />
          <Stack.Screen name="Komunitas" component={Komunitas} />
          <Stack.Screen name="ListUMKM" component={ListUMKM} />
          <Stack.Screen name="ProfileUMKM" component={ProfileUMKM} />
          <Stack.Screen name="ProfileMentor" component={ProfileMentor} />
          <Stack.Screen name="ChatList" component={ChatList} />
          <Stack.Screen name="ChatRoom" component={ChatRoom} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Routes;
