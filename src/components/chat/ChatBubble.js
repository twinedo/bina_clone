import React, {useState} from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Image,
  Pressable,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {BLACK, PRIMARY, SECONDARY, WHITE} from '../../styles/Colors';
import {API_BINA} from '@env';
import {TextRegular} from '../../styles/TextStyles';
import Feather from 'react-native-vector-icons/Feather';
import ZoomImage from '../zoom_image/ZoomImage';
import {getFileExtention} from '../../services/utils/Constants';
import RNFS from 'react-native-fs';
import {showNotification} from '../../services/utils/localNotification';

import {format, parseISO} from 'date-fns';

const ChatBubble = props => {
  const isMe = props.idUser;
  // const idUser = props.idUser;
  // console.log('is Me', isMe);

  const [isPictureVisible, setIsPictureVisible] = useState(false);
  const [uri, setUri] = useState('');

  const setModal = item => {
    //console.log('modal: ' + item.issueProofPhoto);
    setIsPictureVisible(true);
    setUri(item);
  };

  // console.log('props.createdAt', props.createdAt);

  const checkPermission = async () => {
    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };

  // const [progressDownload, setProgressDownload] = useState('');

  const downloadFile = () => {
    let date = new Date();
    let FILE_URL = `${API_BINA}uploads/${props.text}`;
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // if (jobId !== -1) {
    //   setProgressDownload('A download is already in progress');
    // }

    // const progress = data => {
    //   const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
    //   const text = `Progress ${percentage}%`;
    //   if (percentage === 100) {
    //     setProgressDownload('Download Completed');
    //   } else {
    //     setProgressDownload(text);
    //   }
    // };

    // const begin = res => {
    //   setProgressDownload('Download has begun');
    // };

    const progressDivider = 1;

    const downloadDest =
      `${RNFS.DownloadDirectoryPath}/file_bina_'` +
      Math.floor(date.getTime() + date.getSeconds() / 2) +
      file_ext;

    const ret = RNFS.downloadFile({
      fromUrl: FILE_URL,
      toFile: downloadDest,
      begin,
      progress,
      background: true,
      progressDivider,
    });

    jobId = ret.jobId;
    ret.promise
      .then(res => {
        console.log('res download', res);
        if (res.statusCode === 200) {
          showNotification('Bina: Download', `${props.text}`, '2');
          alert('Download Successfully');
        }
        jobId = -1;
      })
      .catch(err => {
        console.log('err download', err);
        jobId = -1;
      });
  };

  const isDateBeforeToday = date => {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
  };

  // console.log('tes kondisi', isDateBeforeToday(new Date(props.createdAt)));

  return (
    <View
      style={
        isMe === props.sendUserId ? styles.containerIsMe : styles.containerNotMe
      }>
      {props.type === 1 && (
        <TextRegular style={{color: BLACK}}>{props.text}</TextRegular>
      )}
      {props.type === 2 && (
        <Pressable onPress={() => setModal(`${API_BINA}uploads/${props.text}`)}>
          <Image
            source={{uri: `${API_BINA}uploads/${props.text}`}}
            style={styles.imageOnChat}
            resizeMode={'contain'}
          />
        </Pressable>
      )}
      {props.type === 3 && (
        <Pressable style={styles.viewFileName}>
          <TextRegular style={styles.txtFileName(isMe)}>
            {props.text}
          </TextRegular>
          <Feather
            name="download"
            size={18}
            color={WHITE}
            onPress={checkPermission}
          />
        </Pressable>
      )}

      <ZoomImage
        isVisible={isPictureVisible}
        onBackButtonPress={() => setIsPictureVisible(false)}
        onBackdropPress={() => setIsPictureVisible(false)}
        onClosePress={() => setIsPictureVisible(false)}
        onDownloadPress={checkPermission}
        uri={uri}
      />
      <TextRegular style={{fontSize: 10, margingTop: 4, color: BLACK}}>
        {!isDateBeforeToday(new Date(props.createdAt))
          ? format(parseISO(props.createdAt), 'HH:mm')
          : format(parseISO(props.createdAt), 'dd/MM/yyyy HH:mm')}
      </TextRegular>
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  containerIsMe: {
    backgroundColor: PRIMARY,
    marginBottom: 10,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 16,
    // flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  containerNotMe: {
    backgroundColor: SECONDARY,
    marginBottom: 10,
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
    padding: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 0,
    // flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  imageOnChat: {width: 150, height: 150},
  txtFileName: isMe => ({marginRight: 10, color: isMe ? WHITE : BLACK}),
  viewFileName: {flexDirection: 'row'},
});
