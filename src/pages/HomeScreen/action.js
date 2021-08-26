// import firestore, {firebase} from '@react-native-firebase/firestore';
import { SET_LIST_MESSAGES, SET_LOGIN, USER_PROFILE,SET_UID_OTHER_USERS } from '../../helper/Constant';
import {Store} from '../../redux/Store';
import {replaceTo, showMessage} from '../GlobalAction';
import React, { BackHandler } from 'react-native';



export const onLogout = (navigation) => {
  BackHandler.exitApp();
};

export const logChat = (chat) => {
  fetch("http://192.168.100.42:3000/logChat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question: chat
    })
  })
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
    .catch(error => alert("Error " + error))
}