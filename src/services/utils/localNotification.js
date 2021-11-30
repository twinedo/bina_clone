import PushNotification from 'react-native-push-notification';

const showNotification = (title, message, channelId) => {
  PushNotification.localNotification({
    channelId: channelId,
    title: title,
    message: message,
    smallIcon: 'ic_notification',
    largeIcon: 'ic_launcher',
    priority: 'max',
    vibration: 2000,
    allowWhileIdle: true,
  });
};

const cancelHandle = () => {
  PushNotification.cancelAllLocalNotifications();
};

export {showNotification, cancelHandle};
