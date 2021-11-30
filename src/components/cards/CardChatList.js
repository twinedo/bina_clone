import React from 'react';
import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import {WHITE, GRAY3, GRAY2, PRIMARY} from '../../styles/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';

const CardChatList = props => {
  console.log('{props.createdAt}', props.createdAt);
  return (
    <Pressable style={styles.container} {...props}>
      <View style={styles.containerImg}>
        <Image style={styles.img} resizeMode="contain" source={props.source} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{props.name}</Text>
        <Text ellipsisMode="tail" style={styles.text}>
          {props.message}
        </Text>
      </View>
      <View style={styles.containerInfo}>
        <Text style={styles.time}>{props.createdAt}</Text>
        <View style={styles.badge}>
          <Text style={styles.number}>3</Text>
        </View>
      </View>
    </Pressable>
  );
};

CardChatList.propTypes = {
  source: PropTypes.any,
  name: PropTypes.string,
  message: PropTypes.string,
  createdAt: PropTypes.any,
  data: PropTypes.object,
};

export default CardChatList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: WHITE,
    elevation: 5,
    alignItems: 'center',
  },
  containerImg: {
    width: 90,
    height: 72,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    // borderWidth: 1,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: GRAY3,
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    color: GRAY3,
  },
  containerInfo: {
    // borderWidth: 1,
    paddingRight: 10,
    paddingLeft: 5,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  time: {
    fontWeight: '400',
    marginBottom: 3,
    color: GRAY3,
  },
  badge: {
    width: 24,
    height: 24,
    backgroundColor: PRIMARY,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 12,
    color: WHITE,
  },
});
