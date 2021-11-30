import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import {GRAY3, PRIMARY, WHITE} from '../../styles/Colors';
import {TextRegular} from '../../styles/TextStyles';

const CardMentorChat = props => {
  return (
    <View style={styles.containerCard}>
      <View style={styles.card}>
        <View style={styles.containerImg}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={props.mentorPicture}
          />
        </View>
        <View style={styles.content}>
          <View style={{marginBottom: 5}}>
            <TextRegular style={styles.mentorName}>
              {props.mentorName}
            </TextRegular>
            <TextRegular style={styles.umkmName}>
              {props.mentorDeskripsi}
            </TextRegular>
          </View>
          <Button
            // style={{width: 92, alignSelf: 'flex-end'}}
            backgroundColor={PRIMARY}
            text="Chat"
            textAlign="center"
            textColor={WHITE}
            borderColor={PRIMARY}
            fontSize={15}
            onPress={() => props.onPressChat()}
          />
        </View>
      </View>
    </View>
  );
};

CardMentorChat.propTypes = {
  mentorPicture: PropTypes.any,
  mentorName: PropTypes.string,
  mentorDeskripsi: PropTypes.string,
};

const styles = StyleSheet.create({
  containerCard: {},
  card: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    flexDirection: 'row',
  },
  containerImg: {
    width: 80,
    height: 80,
    overflow: 'hidden',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  content: {
    flexDirection: 'column',
    paddingLeft: 15,
    flex: 1,
  },
  mentorName: {
    fontSize: 15,
    fontWeight: '400',
    color: GRAY3,
  },
  umkmName: {
    fontSize: 12,
    color: GRAY3,
  },
});

export default CardMentorChat;
