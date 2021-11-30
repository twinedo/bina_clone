import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {BLACK, GRAY3, SECONDARY} from '../../styles/Colors';
import {TextBold, TextRegular} from '../../styles/TextStyles';

const CardProfile = props => {
  return (
    <View style={{flexDirection: 'column', marginBottom: 10}}>
      <TextBold
        style={{
          marginBottom: 5,
          fontSize: 12,
          color: GRAY3,
          fontWeight: 'bold',
        }}>
        {props.title}
      </TextBold>
      <View
        style={{
          // borderWidth: 1,
          borderColor: '#EEEEEE',
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 5,
          backgroundColor: SECONDARY,
        }}>
        <TextRegular style={{color: BLACK}}>{props.text}</TextRegular>
      </View>
    </View>
  );
};

CardProfile.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};

export default CardProfile;

const styles = StyleSheet.create({});
