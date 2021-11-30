import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';
import {GRAY4, BLACK} from 'styles/Colors';

const Input = props => {
  return (
    <View style={styles.container}>
      {props.iconLeft}
      <TextInput
        {...props}
        style={styles.field}
        placeholder={props.placeholder}
        placeholderTextColor={GRAY4}
      />
      {props.iconRight}
    </View>
  );
};

Input.propTypes = {
  iconLeft: PropTypes.element,
  iconRight: PropTypes.element,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    marginVertical: 10,
    borderColor: '#E5E5E5',
  },
  field: {flex: 1, color: BLACK},
});
