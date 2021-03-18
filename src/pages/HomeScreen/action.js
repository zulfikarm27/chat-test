import firestore, {firebase} from '@react-native-firebase/firestore';
import { SET_LIST_MESSAGES, SET_LOGIN, USER_PROFILE,SET_UID_OTHER_USERS } from '../../helper/Constant';
import {Store} from '../../redux/Store';
import { showMessage } from '../GlobalAction';



export const saveTokenToFirebase = async (token) => {
  const UID = firebase.auth().currentUser.uid;
  await firestore()
    .collection('users')
    .doc(UID)
    .update({
      tokens: firestore.FieldValue.arrayUnion(token),
      uid:UID
    });
};

export const onLogout = (navigation) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('User signed out!')
      // navigation handle by observer onAuthStateChange at splashscreen
      // navigation.replace("Login")
      Store.dispatch({
          type:SET_LOGIN,
          payload: false
      }),
      (error) => {
        showMessage("failed to logout")
        console.log("error logout:", error)
      }
    });
};

export const saveUserProfiletoLocal = () => {
    const UID = firebase.auth().currentUser.uid;
    firestore().collection("users").doc(UID).get().then(
      (ress)=>{
        const user = ress.data()
        Store.dispatch({
          type: USER_PROFILE,
          payload: user
        })
      },
      (error)=>{
        console.log("failed to fetch user profile firebase,", error)
      }
    )
}

export const setOnlineUserFirebase = (UID,isOnline) => {
  
  try {
    firestore().collection("users").doc(UID).update({
      isOnline : isOnline
      }).then(
        ()=>{},
        (e)=>{
          console.log("Failed setOnline firestore",e)
        }
      )
  } catch (error) {
    console.log("error home action :", error)
  }
  
}

export const fetchMessages = (uid) => dispatch => {
  
  firestore().collection('chatting')
    .doc(uid)
    .collection("chatWith")
    .onSnapshot(
      (res)=>{
        const chattingList = []
        res.docs.forEach((docs)=>{
            chattingList.push(docs.data())
        })
        console.log(chattingList)
        dispatch({type:SET_LIST_MESSAGES, payload: chattingList})
      },
      (err)=>{
        console.log(err)
      }
    )
    

}

export const getUserProfile = (UID) => {
  firestore().collection('users').doc(UID).get().then(
    (ress)=>{
      console.log(ress)
    },
    (err)=>{
      console.log(err)
    }
  )
}



