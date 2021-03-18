import auth from '@react-native-firebase/auth';
import { SET_LOGIN } from '../../helper/Constant';
import {Store} from '../../redux/Store';
import {replaceTo, showMessage} from '../GlobalAction';

export const onButtonLoginClick = (email, password, navigation) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(
      () => {
        // handle navigation at observer on spoashscreen
        // replaceTo(navigation, 'Home');
        Store.dispatch({
          type: SET_LOGIN,
          payload: true,
        });
      },
      (error) => {
        console.log(error);
        if (error.code === 'auth/user-not-found') {
          showMessage('Email not registered');
        } else if (error.code === 'auth/wrong-password') {
          showMessage('Wrong password');
        } else {
          showMessage(error.code);
        }
      },
    );
};
