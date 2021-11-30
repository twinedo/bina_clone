import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextBold} from '../../styles/TextStyles';
import PropTypes from 'prop-types';
import {GRAY3, GRAY4} from '../../styles/Colors';

const Toolbar = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <AntDesign
        name="arrowleft"
        size={24}
        color={GRAY3}
        style={styles.iconLeft}
        onPress={() => navigation.goBack()}
      />
      <TextBold style={styles.title}>{props.title}</TextBold>
      {props.iconRight}
    </View>
  );
};

Toolbar.propTypes = {
  title: PropTypes.string,
  iconRight: PropTypes.element,
};

export default Toolbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: GRAY4,
  },
  iconLeft: {marginRight: 16},
  title: {flex: 1, fontSize: 20, color: GRAY3},
});
