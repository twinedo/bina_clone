import React from 'react';
import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import {WHITE, GRAY3, GRAY2} from '../../styles/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

const CardRow = props => {
  return (
    <Pressable style={styles.container} {...props} onPress={props.onPress}>
      <View style={styles.containerImg}>
        <Image style={styles.img} resizeMode="contain" source={props.source} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{props.name}</Text>
        <View style={styles.group}>
          <MaterialIcons name="fastfood" colors={GRAY2} size={16} />
          <Text style={styles.text}>{props.category}</Text>
        </View>
        <View style={styles.group}>
          <MaterialIcons name="location-on" colors={GRAY2} size={16} />
          <Text style={styles.text}>{props.location}</Text>
        </View>
      </View>
    </Pressable>
  );
};

CardRow.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.any,
  name: PropTypes.string,
  category: PropTypes.string,
  location: PropTypes.string,
};

export default CardRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    // marginVertical: 10,
    // marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: WHITE,
    elevation: 10,
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
    margin: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
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
    fontWeight: '700',
    color: GRAY3,
    paddingLeft: 5,
  },
});
