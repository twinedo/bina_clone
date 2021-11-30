import io from 'socket.io-client';
import PropTypes from 'prop-types';
import {useRef, useState} from 'react';
import {useEffect} from 'react';

useWebSockets.propTypes = {
  userId: PropTypes.number,
  enabled: PropTypes.bool,
  onConnected: PropTypes.func,
};

export const useWebSockets = ({userId, enabled, onConnected}) => {
  const ref = useRef();
  const [messages, setMessages] = useState([
    {
      content: '',
      senderId: '',
      userId: '',
      date: Date(),
    },
  ]);

  const send = (msg, senderId) => {
    ref.current.emit('message', {
      content: msg,
      senderId: senderId,
      userId,
      date: new Date(),
    });
  };

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const socket = io('');
    socket.emit('joinRoom', userId);

    socket.emit('message', msg => {
      setMessages(prev => prev.concat(prev));
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on('connect', () => {
      if (onConnected) {
        onConnected();
      }
    });

    socket.on('reconnect', () => {
      socket.emit('joinRoom', userId);
    });

    ref.current = socket;
    return () => socket.disconnect();
  }, [enabled, userId]);

  return {
    send,
    messages,
  };
};
