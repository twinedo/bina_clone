/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import Toolbar from '../../components/toolbar/Toolbar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Input from '../../components/input/Input';
import CardChatList from '../../components/cards/CardChatList';
import {GetListChatMentor} from '../../services/handler/ChatHandler';
import {AppContext} from '../../services/context/Context';
import {format, parseISO} from 'date-fns';
import {WHITE} from '../../styles/Colors';
import {useNavigation} from '@react-navigation/native';

const ChatList = () => {
  const {state} = useContext(AppContext);
  const {authState} = state;

  const navigation = useNavigation();

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
    {
      id: '124adw123afefn',
      name: 'Kedai Kopi Kamu',
      picture: require('../../assets/images/HomeUmkmLogo.png'),
    },
    {
      id: '124adwda23fefn',
      name: 'Kedai Kopi Kamu',
      picture: require('../../assets/images/HomeUmkmLogo.png'),
    },
  ];

  const [listChat, setListChat] = useState([]);

  useEffect(() => {
    if (authState.dataSignIn.role === 'Mentor') {
      GetListChatMentor(authState.dataSignIn.id)
        .then(res => {
          console.log('res list chat ment', res);
          setListChat(res);
        })
        .catch(err => console.log('error list chat', err));
    }
  }, []);

  return (
    <View style={styles.container}>
      <Toolbar
        title="Chat List"
        iconRight={<Ionicons name="list" size={24} />}
      />
      <View style={styles.body}>
        <Input
          placeholder="Cari UMKM"
          iconLeft={<MaterialIcons name="search" size={24} />}
        />
        <FlatList
          data={listChat}
          keyExtractor={item => item.umkmId}
          // horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              // <Pressable onPress={() => navigation.navigate('ChatRoom')}>
              <View style={{flex: 1, marginHorizontal: 5}}>
                <CardChatList
                  source={DATA_CARD[0].picture}
                  name={item.umkmName}
                  message={item.message}
                  createdAt={format(parseISO(item.createdAt), 'HH:mm')}
                  data={item}
                  onPress={() => navigation.navigate('ChatRoom', {data: item})}
                />
              </View>
              // </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  body: {
    flex: 1,
    padding: 15,
  },
});
