import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {TextRegular} from 'styles/TextStyles';
import {PRIMARY} from 'styles/Colors';
import {Feather} from 'react-native-vector-icons/Feather';
import {WHITE} from '../../styles/Colors';

const Button = ({
  onPress,
  iconLeft,
  iconRight,
  text,
  textAlign,
  textColor,
  backgroundColor,
  borderColor,
  fontSize,
  disabled,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        },
      ]}>
      {iconLeft}
      {
        <TextRegular
          style={[
            styles.textStyle,
            {
              textAlign: textAlign,
              color: textColor,
              fontSize: fontSize === undefined ? 24 : fontSize,
            },
          ]}>
          {text}
        </TextRegular>
      }
      {iconRight}
    </Pressable>
  );
};

Button.propTypes = {
  onPress: PropTypes.func,
  iconLeft: PropTypes.element,
  iconRight: PropTypes.element,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  textAlign: PropTypes.string,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  fontSize: PropTypes.number,
  disabled: PropTypes.bool,
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: PRIMARY,
    alignItems: 'center',
    paddingHorizontal: 15,
    // paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: PRIMARY,
    elevation: 5,
  },
  textStyle: {
    flex: 1,
    fontSize: 24,
    color: WHITE,
  },
});
