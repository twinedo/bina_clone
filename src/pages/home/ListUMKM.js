import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import CardRow from '../../components/cards/CardRow';
import Toolbar from '../../components/toolbar/Toolbar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Input from '../../components/input/Input';
import {WHITE} from '../../styles/Colors';
import {GetListUMKMbyMentor} from '../../services/handler/UmkmHandler';
import {AppContext} from '../../services/context/Context';
import {useNavigation} from '@react-navigation/core';

const ListUMKM = props => {
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
  ];

  const [listUMKM, setListUMKM] = useState([]);

  useEffect(() => {
    GetListUMKMbyMentor(authState?.dataSignIn?.id)
      .then(res => {
        console.log('reslist', res);
        setListUMKM(res);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Toolbar
        title="UMKM Binaan"
        iconRight={<Ionicons name="list" size={24} />}
      />
      <View style={styles.body}>
        <View style={{marginBottom: 10}}>
          <Input
            placeholder="Cari UMKM"
            iconLeft={<MaterialIcons name="search" size={24} />}
          />
        </View>
        <FlatList
          data={listUMKM}
          keyExtractor={item => item.id}
          // horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View style={{marginBottom: 15, marginHorizontal: 5}}>
                <CardRow
                  onPress={() =>
                    navigation.navigate('ProfileUMKM', {item: item})
                  }
                  source={DATA_CARD[0].picture}
                  name={item?.DetailUser.namaLengkap}
                  category={item?.DetailUser.kategoriUsaha}
                  location={item?.DetailUser.lokasiUsaha}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flex: 1,
  },
  body: {
    padding: 15,
  },
});

export default ListUMKM;
