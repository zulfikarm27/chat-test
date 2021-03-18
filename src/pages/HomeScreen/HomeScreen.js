import React, {Component} from 'react';
import { FlatList, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {primaryColor, screenWidth, SET_LOGIN, SET_ONLINE,SET_UID, SET_UID_USER_2, SET_UNREAD_CHAT_KEY, whiteColor} from '../../helper/Constant';
import {dummyAvatar} from '../../assets';
import CFab from './components/CFab';
import ChatCard from './components/ChatCard';
import CMargin from "../../components/CMargin";
import { fetchMessages, getOtherUserId, getUserProfile, onLogout, saveTokenToFirebase, saveUserProfiletoLocal, setOnlineUserFirebase } from './action';
import messaging from "@react-native-firebase/messaging";
import firestore,{ firebase } from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import CLogout from './components/CLogout';
import CModalLogOut from './components/CModalLogOut';
import PushNotification from 'react-native-push-notification';


class HomeScreen extends Component {
  constructor(props){
    super(props)
    this.state= {
        isVisible: false,
    }
  }

  componentDidMount() {
    const isOnline = this.props.isOnline
    if (Platform.OS === "android") {
      messaging().getToken().then(
        (token)=>{
          saveTokenToFirebase(token,isOnline)
        }
      )
    }else if (Platform.OS === "ios") {
      messaging().getAPNSToken().then(
        (token) => {
          saveTokenToFirebase(token,isOnline)
        }
      )
    }

    saveUserProfiletoLocal()
    
    console.log("User active : " ,firebase.auth().currentUser.email)
    const uid = firebase.auth().currentUser.uid
    console.log("UID:" ,uid)
    this.props.setUid(uid)
    
    setTimeout(() => {
      //set User online
      setOnlineUserFirebase(uid,true)
    }, 500);

    this.unsubscribe = messaging().onMessage(async remoteMessage => {
      // do something when notification foreground arrived
      // alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      
    });

    // PushNotification.configure({
    //   onNotification : (notification)=>{
    //     console.log('Notif data pressed ', notification.data.uid2)
    //     this.props.setUiduser2(notification.data.uid2)
    //     this.props.navigation.navigate("Chatting")
    //   } 
    // })

    

    this.props.fetchMessages(uid)

    
    
  }

  

  componentWillUnmount(){
    this.unsubscribe()
    //set user offline
    setOnlineUserFirebase(this.props.lastUID,false)

  }

  render() {
    console.log('renderItem')
    return (
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View style={styles.header} />
        <View style={styles.contentHeader}>
          <Image style={styles.avatar} source={{uri:this.props.userProfile.avatarUrl}} />
          <View>
              <Text numberOfLines={1} style={styles.textHead}>{this.props.userProfile.name}</Text>
              <Text style={styles.textBio}>{this.props.userProfile.biodata}</Text>
          </View>
        </View>
        {/* for Debugging */}
        {/* <Text>{JSON.stringify(this.props.listMessages)}</Text> */}
        {/* <Text>{JSON.stringify(this.props.uidOtherUsers)}</Text> */}
        <FlatList
          style={{paddingHorizontal:8, paddingVertical:24}}
          data={this.props.listMessages}
          keyExtractor={(_item,index)=> 'key'+index}
          renderItem={({item})=>{
            return <ChatCard 
            onPress={()=>{
              this.props.setUiduser2(item.docID)
              this.props.navigation.navigate("Chatting")
              this.props.setUnreadChatKey(item.unreadChat)
            }} 
            miniChat={item.miniChat} 
            name={item.name} 
            avatarUrl={item.avatarUrl}
            countUnread={item.unreadChat.length}
            time={item.miniTime}
            />
          }}
        />
        <CFab right={21} top={87} onPress={()=>{this.props.navigation.navigate("Contact")}}/>
        <CLogout onPress={()=>{this.setState({isVisible:true})}} />
        <CModalLogOut isVisible={this.state.isVisible} onCencel={()=>this.setState({isVisible:false})} 
          onLogout={()=> {
            onLogout(this.props.navigation) 
            setOnlineUserFirebase(this.props.uid,false)}} />
      </SafeAreaView>
    );
  }
}



const styles = StyleSheet.create({
  header: {
    height: 115,
    backgroundColor: primaryColor,
    borderBottomLeftRadius: 60,
  },
  contentHeader: {
    position:'absolute',
    start:0,
    top:0,
    marginStart:30,
    marginTop:15,
    flexDirection: 'row',
  },
  avatar:{
      height:70,
      width:70,
      resizeMode: 'cover',
      borderRadius: 35,
      marginEnd: 17
  },
  textHead:{
      fontSize:18,
      fontWeight:'bold',
      color: whiteColor,
      marginTop:8,
      maxWidth: screenWidth * 0.6
  },
  textBio:{
      marginStart: 4,
      fontSize:12,
      color:whiteColor,
      maxWidth: screenWidth * 0.6
  }
});

const mapStatetoProps = (state) =>{
  return{
    stateReducer : state.FirebaseReducer,
    userProfile : state.FirebaseReducer.userProfile,
    isOnline : state.InputReducer.isOnline,
    lastUID : state.InputReducer.uid,
    listMessages : state.HomeReducer.listMessages,
    uidOtherUsers : state.FirebaseReducer.uidOtherUsers
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    setLogin : (isLogin) => {dispatch({
      type: SET_LOGIN,
      payload : isLogin
    })},
    setOnline : (isOnline) => {dispatch({
      type : SET_ONLINE,
      payload: isOnline
    })},
    setUid : (uid) => {dispatch({
      type: SET_UID,
      payload : uid
    })},
    setUiduser2 : (uid) => {dispatch({
      type : SET_UID_USER_2,
      payload : uid
    })},
    setUnreadChatKey : (key)=> {dispatch({
      type : SET_UNREAD_CHAT_KEY,
      payload: key
    })},
    fetchMessages : (uid) => {dispatch(fetchMessages(uid))},
    getUserProfile : (UID) => {dispatch(getUserProfile(UID))}
  }
}



export default connect(mapStatetoProps,mapDispatchtoProps)(HomeScreen)