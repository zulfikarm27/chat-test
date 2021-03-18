import {showMessage} from '../GlobalAction';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {Store} from '../../redux/Store';
import {BIODATA_VALIDATION, EMAIL_VALIDATION, PASSWORD_VALIDATION, USERNAME_VALIDATION, VALIDATION} from '../../helper/Constant';

export const onButtonRegisterClick = async (
  username,
  email,
  password,
  biodata,
  navigation,
) => {
  let isValid = true;
  const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (username.trim() === '') {
    isValid = false;
    Store.dispatch({type: USERNAME_VALIDATION, username: 'Username must be fill out'});
  } else {
    Store.dispatch({type: USERNAME_VALIDATION, username: ''});
  }

  if (password.length < 7) {
    isValid = false;
    Store.dispatch({type: PASSWORD_VALIDATION, password: 'Password must be at least 8 characters long'});
  } else {
    Store.dispatch({type: PASSWORD_VALIDATION, password: ''});
  }

  if (biodata.trim() === '') {
    isValid = false;
    Store.dispatch({type: BIODATA_VALIDATION, biodata: 'Biodata must be fill out'});
  } else {
    Store.dispatch({type: BIODATA_VALIDATION, biodata: ''});
  }

  if (email.trim() === '') {
    isValid = false;
    Store.dispatch({type: EMAIL_VALIDATION, email: 'Email must be fill out'});
  } else if (regEmail.test(email) === false) {
    isValid = false;
    Store.dispatch({type: EMAIL_VALIDATION, email: 'Invalid email'});
  } else {
    Store.dispatch({type: EMAIL_VALIDATION, email: ''});
  }

  if (isValid) {
    const cardentialUser = await _registerEmailandPassword(email, password);
    if (cardentialUser) {
      const uid = cardentialUser.user.uid;

      _saveToFireStore(username, email, biodata, uid);
      navigation.goBack(null);

      console.log('uid : ', uid);
    }
  }
};

const _saveToFireStore = (inputUsername, inputEmail, inputBiodata, uid) => {
  firestore()
    .collection('users')
    .doc(uid)
    .set({
      name: inputUsername,
      email: inputEmail,
      biodata: inputBiodata,
      isOnline: false,
      uid:'',
      avatarUrl: 'https://images.squarespace-cdn.com/content/5b47794f96d4553780daae3b/1531516790942-VFS0XZE207OEYBLVYR99/profile-placeholder.jpg?content-type=image%2Fjpeg'
    })
    .then(
      () => {
        console.log('push profile to firestore success');
      },
      () => {
        console.log('push profile to firestore failed');
      },
    );
};

const _registerEmailandPassword = async (inputEmail, inputPassword) => {
  let cardentialUser;
  try {
    cardentialUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(inputEmail, inputPassword);

    showMessage('Success register account');
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      showMessage('That email address is already in use!');
    } else if (error.code === 'auth/invalid-email') {
      showMessage('That email address is invalid!');
    } else {
      showMessage('failed :' + error.code);
    }
  }
  console.log('Cardential user,', cardentialUser);
  return cardentialUser;
};
