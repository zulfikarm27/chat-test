import {Platform, ToastAndroid} from 'react-native';

export const navigateTo = (navigation, destination) => {
  navigation.navigate(destination);
};

export const replaceTo = (navigation, destination) => {
  navigation.replace(destination);
};

export const showMessage = (msg) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  } else {
    alert(msg);
  }
};
