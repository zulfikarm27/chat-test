import firestore, { firebase } from "@react-native-firebase/firestore";
import { SET_CHATTING_DATA } from "../../helper/Constant";
import axios from "axios";
import { showMessage } from "../GlobalAction";
import { floor } from "react-native-reanimated";


export const getUserTargetProfile = (uid) =>{
    return firestore().collection("users").doc(uid)
}

export const sendChat = async (user1Profile,user2Profile,chatContent,sender) =>{

    const UID2 = user2Profile.uid
    const UID1 = user1Profile.uid
    const tokens = user2Profile.tokens
    const uinique = Math.floor(Math.random() * 100);
    const signChatUnread = "UR-" + uinique;

    
    firestore().collection('chatting')
        .doc(UID1)
        .collection('chatWith')
        .doc(UID2)
        .set({
            docID : UID2,
            avatarUrl : user2Profile.avatarUrl,
            name : user2Profile.name,
            isOnline : user2Profile.isOnline,
            miniChat : chatContent,
            miniTime: getCurrentTimes(),
            conversation : firestore.FieldValue.arrayUnion({
                chattingContent : chatContent,
                date : getCurrentDate(),
                time : getCurrentTimes(),
                sendBy : sender
            }),
            unreadChat : firestore.FieldValue.arrayUnion()
        },{merge: true})

    firestore().collection('chatting')
        .doc(UID2)
        .collection('chatWith')
        .doc(UID1)
        .set({
            docID : UID1,
            avatarUrl : user1Profile.avatarUrl,
            name : user1Profile.name,
            isOnline : user1Profile.isOnline,
            miniChat : chatContent,
            miniTime: getCurrentTimes(),
            conversation : firestore.FieldValue.arrayUnion({
                chattingContent : chatContent,
                date : getCurrentDate(),
                time : getCurrentTimes(),
                sendBy : sender
            }),
            unreadChat : firestore.FieldValue.arrayUnion(signChatUnread)
        },{merge:true})
        
    const params = JSON.stringify({
        "registration_ids": tokens,
        "notification": {
          "title": `Message from ${user1Profile.name}`,
          "body": `message: ${chatContent}`,
          "mutable_content": true,
          "sound": "Tri-tone"
          },
        "data": {
            "uid2" : UID1
        }
    })
    const authkey = "key=AAAAouiVHhI:APA91bHa3ExdoE7RkrF7SSaxFSJ4Ue5e4O8cVwmY8g5Ip_OJo6iRPA9ziJupN1gHne0F95JmNi1ZtxALah5jV5ntJDxj5I7UAv2otSajSBnO7AI283nV3hJHWB1TQNGQRvOoKn7DbPS1"
    axios.post('https://fcm.googleapis.com/fcm/send',params,{
        'headers':{
            "content-type":"application/json",
            "Authorization" : authkey
        }
    }).then(
        ()=>{
            
        },
        (er)=>{
            console.log('notif:',er)
        }
    )

}

const getCurrentDate=()=>{

    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
}

const getCurrentTimes = () => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()

    return `${hours}:${minutes}`
}

export const getChatting =  (uid1,uid2) => dispatch =>{
    
    
    firestore().collection("chatting").doc(uid1).collection('chatWith').doc(uid2).onSnapshot(
        (res)=>{
            try {
                const chatData = res.data().conversation
                console.log('chat with uid2:', chatData)
                dispatch({type: SET_CHATTING_DATA, payload : chatData})
            } catch (error) {
                console.log(error)   
            }
        },
        (err)=>{
            console.log(err)
        }
    )
    
}

export const onDeleteChat = (chatObj,indexChat,user1Profile,user2Profile) => {
    console.log("Chat data",chatObj)
    console.log("Chat index selected",indexChat)

    const UID2 = user2Profile.uid
    const UID1 = user1Profile.uid

    chatObj.splice(indexChat,1)

    firestore().collection('chatting')
        .doc(UID1)
        .collection('chatWith')
        .doc(UID2)
        .set({
            docID : UID2,
            avatarUrl : user2Profile.avatarUrl,
            name : user2Profile.name,
            isOnline : user2Profile.isOnline,
            miniChat : "Pesan telah dihapus",
            conversation : [...chatObj]
        },{merge: true})

    firestore().collection('chatting')
        .doc(UID2)
        .collection('chatWith')
        .doc(UID1)
        .set({
            docID : UID1,
            avatarUrl : user1Profile.avatarUrl,
            name : user1Profile.name,
            isOnline : user1Profile.isOnline,
            miniChat : "Pesan telah di hapus",
            conversation : [...chatObj]
        },{merge:true})
}


export const clearUnreadMsg = (uid,docID, key) =>{
    console.log(key)
    firestore().collection("chatting")
      .doc(uid)
      .collection("chatWith")
      .doc(docID)
      .update({
        unreadChat: firestore.FieldValue.arrayRemove(...key)
      })
  }