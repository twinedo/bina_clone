import {Linking} from 'react-native';

export const _onLinkClick = url => {
  const supported = Linking.canOpenURL(url);
  console.log('Supported', supported);
  if (supported) {
    Linking.openURL(url);
  } else {
    alert(`Don't know how to open this URL: ${url}`);
  }
};

export const getFileExtention = fileUrl => {
  // To get the file extension
  return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
};
