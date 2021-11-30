/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import Toolbar from '../../components/toolbar/Toolbar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Input from '../../components/input/Input';
import ChatBubble from '../../components/chat/ChatBubble';
import {useWebSockets} from '../../services/socket/useWebSocket';
import {AppContext} from '../../services/context/Context';
import io from 'socket.io-client';
import {API_BINA} from '@env';
import {
  GetChatHistory,
  GetChatReceiverName,
  UploadFile,
  UploadImage,
} from '../../services/handler/ChatHandler';
import DocumentPicker from 'react-native-document-picker';
import {showNotification} from '../../services/utils/localNotification';
import {BLACK, GRAY3, WHITE} from '../../styles/Colors';
import {TextBold} from '../../styles/TextStyles';

import ViewSelectedFile from './../../components/chat/ViewSelectedFile';

let socket;
const ChatRoom = props => {
  // console.log('props', props);

  const dtUser = props.route?.params?.data;
  // console.log('dtUser', dtUser);

  const {state, func} = useContext(AppContext);
  const {authState, userState} = state;

  const [messages, setMessages] = useState();
  const [receiverName, setReceiverName] = useState('');

  const [inputMessage, setInputMessage] = useState('');

  const [selectedFile, setSelectedFile] = useState({
    file: null,
    type: null,
  });

  const ref = useRef();

  const receiverUserId =
    authState.dataSignIn.role === 'UMKM'
      ? parseInt(userState?.userDetail?.mentorId)
      : dtUser?.umkmId;

  const userId = authState?.dataSignIn?.id;

  // console.log('authState', authState.dataSignIn);
  // console.log('userState', userState?.userDetail?.mentorId);
  console.log('messages', messages);
  // console.log('receiverUserId', receiverUserId);
  // console.log('userId', userId);
  // console.log(
  //   ' userState?.userDetail?.mentorId',
  //   userState?.userDetail?.mentorId,
  // );
  // console.log('userState', userState);

  socket = io(`${API_BINA}`, {withCredentials: false});

  const roomid =
    authState.dataSignIn.role === 'UMKM'
      ? `${receiverUserId}${userId}`
      : `${userId}${receiverUserId}`;

  // console.log('roomid', roomid);
  // console.log('roomid[0]', roomid[0]);
  // console.log('roomid[1]', roomid[1]);

  useEffect(() => {
    // console.log('tes');
    socket.emit(
      'join',
      {
        idUser: userId,
        idRoom: parseInt(roomid),
      },
      error => {
        if (error) {
          // console.log('errornya', error);
          alert(error);
        }
      },
    );

    // socket.emit(
    //   'join',
    //   {idUser: userId, idRoom: `${userId}${receiverUserId}`},
    //   error => {
    //     if (error) {
    //       // console.log('errornya', error);
    //       alert(error);
    //     }
    //   },
    // );
  }, [userId, receiverUserId, roomid]);

  const loadDefaultMessages = async () => {
    const response = await GetChatHistory(userId, receiverUserId);
    const data = response;
    setMessages(data);
  };

  const getReceiverName = async () => {
    const response = await GetChatReceiverName(receiverUserId);
    const data = response;

    setReceiverName(data);
  };

  useEffect(() => {
    getReceiverName();
    loadDefaultMessages();
    // console.log('defaultMessage');

    socket.on('message', message => {
      // console.log('message message message', message);
      setMessages(prev => [...prev, message]);
      // if (authState.dataSignIn.id !== userId) {
      // showNotification(authState.dataSignIn.name, message.message, '1');
      // }
    });
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      ref && ref.current.scrollToEnd({animated: true});
    }, 200);
  };

  useEffect(() => {
    // console.log('scroll');
    if (messages) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSendMessage = async () => {
    // console.log('clicked');

    const fd = new FormData();

    if (selectedFile.type === 'image') {
      const newBody = {
        image: selectedFile.file,
      };

      for (const key in newBody) {
        fd.append(key, newBody[key]);
      }

      const res = await UploadImage(fd, userId, receiverUserId);
      console.log('res img', res);
      socket.emit(
        'sendMessage',
        {
          idUser: userId,
          message: res.message,
          receiverUserId: receiverUserId,
          type: 2,
        },
        () => {
          setSelectedFile({
            file: null,
            type: null,
          });
          setSelectedFile(null);
        },
      );
    } else if (selectedFile.type === 'file') {
      const newBody = {
        file: selectedFile.file,
      };

      for (const key in newBody) {
        fd.append(key, newBody[key]);
      }

      const res = await UploadFile(fd, userId, receiverUserId);
      console.log('res file', res);
      socket.emit(
        'sendMessage',
        {
          idUser: userId,
          message: res.message,
          receiverUserId: receiverUserId,
          type: 3,
        },
        () => {
          setSelectedFile({
            file: null,
            type: null,
          });
          setSelectedFile(null);
        },
      );
    } else {
      if (inputMessage !== '') {
        socket.emit(
          'sendMessage',
          {
            idUser: userId,
            message: inputMessage,
            receiverUserId: receiverUserId,
            type: 1,
          },
          () => {
            // console.log('sukses');
            setInputMessage('');
          },
        );
      }
    }
  };

  const onSelectFile = () => {
    const imagesType = ['image/png', 'image/jpg', 'image/jpeg'];

    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.allFiles],
    })
      .then(res => {
        // console.log(res);
        // console.log(
        //   res[0].uri,
        //   res[0].type, // mime type
        //   res[0].name,
        //   res[0].size,
        // );

        if (res[0].type.includes('image')) {
          // if (res[0].type.includes(imagesType)) {
          setSelectedFile({
            file: res[0],
            type: 'image',
          });
          // } else {
          //   alert('format file image harus png, jpg, jpeg');
          // }
        } else {
          setSelectedFile({
            file: res[0],
            type: 'file',
          });
        }
      })
      .catch(err => {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
          alert('Gagal Memilih File');
        } else {
          throw err;
        }
      });
  };

  return (
    <View style={styles.container}>
      <Toolbar title="Chat" iconRight={<Ionicons name="list" size={24} />} />
      <View style={styles.header}>
        <Image
          style={styles.headerImg}
          resizeMode="contain"
          source={require('../../assets/images/HomeUmkmLogo.png')}
        />
        <TextBold style={styles.headerText}>{receiverName}</TextBold>
      </View>
      <View style={styles.body}>
        {/* <FlatList
          ref={ref}
          data={messages}
          keyExtractor={(_, index) => index + Math.random()}
          // horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            // console.log('iteemdamda', item);
            return (
              <ChatBubble
                sendUserId={item.sendUserId}
                text={item.message}
                idUser={userId}
              />
            );
          }}
        /> */}

        <ScrollView ref={ref} showsVerticalScrollIndicator={false}>
          {messages?.map((item, idx) => {
            return (
              <View key={idx}>
                <ChatBubble
                  sendUserId={item.sendUserId}
                  text={item.message}
                  idUser={userId}
                  type={item.type}
                  createdAt={item.createdAt}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        {selectedFile?.file && selectedFile?.type ? (
          <ViewSelectedFile
            value={selectedFile}
            iconLeft={
              <MaterialIcons
                name="attachment"
                size={24}
                onPress={onSelectFile}
                color={GRAY3}
              />
            }
            iconRight={
              <MaterialIcons
                name="send"
                size={24}
                onPress={() => handleSendMessage()}
                color={GRAY3}
              />
            }
            onRemove={() =>
              setSelectedFile({
                file: null,
                type: null,
              })
            }
            iconClose={
              <Ionicons
                name="close-circle"
                size={20}
                onPress={() =>
                  setSelectedFile({
                    file: null,
                    type: null,
                  })
                }
                color={BLACK}
              />
            }
          />
        ) : (
          <Input
            value={inputMessage}
            placeholder="Ketik sesuatu..."
            iconLeft={
              <MaterialIcons
                name="attachment"
                size={24}
                onPress={onSelectFile}
                color={GRAY3}
              />
            }
            iconRight={
              <MaterialIcons
                name="send"
                size={24}
                onPress={() => handleSendMessage()}
                color={GRAY3}
              />
            }
            onChangeText={e => setInputMessage(e)}
          />
        )}
      </View>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  header: {
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  headerImg: {
    width: 82,
    height: 62,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: GRAY3,
  },
  body: {
    flex: 1,
    padding: 20,
  },
  footer: {
    // borderWidth: 1,
    paddingHorizontal: 25,
    paddingBottom: 5,
  },
});
