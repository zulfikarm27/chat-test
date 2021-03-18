import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { primaryColor, screenHeight, screenWidth, secondaryColor, whiteColor, RESET_CHATTING_DATA } from '../../helper/Constant'
import CButtonBack from './components/cButtonBack';
import { dummyAvatar } from "../../assets";
import CBubbleDate from './components/cBubbleDate';
import CMargin from '../../components/CMargin';
import CBubbleMe from './components/cBubbleMe';
import CBubbleOthers from './components/cBubleOthers';
import CInputChatting from './components/cInputChatting';
import { showMessage } from '../GlobalAction';
import firestore from "@react-native-firebase/firestore";
import { clearUnreadMsg, getChatting, onDeleteChat, sendChat } from './action';
import COptions from './components/cOptionChat';

class ChattingScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            user2Profile:{
                avatarUrl: 'https://images.squarespace-cdn.com/content/5b47794f96d4553780daae3b/1531516790942-VFS0XZE207OEYBLVYR99/profile-placeholder.jpg?content-type=image%2Fjpeg'
            },
            chatContentSend:'',
            isOptionShow: false,
            indexChat : 0
        }
    }

    componentDidMount(){
        const uidUser2 = this.props.uidUser2
        this.unsubsUserProfile = firestore().collection("users").doc(uidUser2).onSnapshot(
            (snpashot)=>{
                this.setState({
                    user2Profile: snpashot.data()
                })
            },
            (error)=>{
                console.log("user2profileuser:" ,error)
            }
        )

        this.props.getChatting(this.props.uidUser1,this.props.uidUser2)
        
    }

    componentWillUnmount(){
        this.unsubsUserProfile()
        this.props.resetDataChat()
        console.log("unmount")

        clearUnreadMsg(this.props.uidUser1,this.props.uidUser2, this.props.unreadChatKey)
    }


    render() {
        const{user2Profile,chatContentSend}=this.state
        const{uidUser1,uidUser2,sender,user1Profile}=this.props
        return (
            <View style={{backgroundColor:'#FBFBFE', flex:1}}>
                <View style={styles.appbar} >
                    <CButtonBack onPress={()=>this.props.navigation.goBack(null)} />
                    <Image source={{uri:user2Profile.avatarUrl}} style={styles.avatar} />
                    <View>
                        <Text numberOfLines={1} style={{color:secondaryColor,fontWeight:'bold',fontSize:14, maxWidth:screenWidth-150}}>{user2Profile.name}</Text>
                        <Text style={{fontSize:12}}>{user2Profile.isOnline ? "online" : "offline"}</Text>
                    </View>
                </View>
                {/* <Text>uid user2:{JSON.stringify(uidUser2)}</Text>
                <Text>uid user1:{JSON.stringify(uidUser1)}</Text>
                <Text>sender : {JSON.stringify(sender)}</Text> */}
                {/* <Text>chatting data : {JSON.stringify(this.props.chattingData)}</Text> */}
                {/* <Text>index chat : {JSON.stringify(this.state.indexChat)}</Text> */}
                    <FlatList
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                    onLayout={() => this.flatList.scrollToEnd({animated: true})}
                    style={{paddingHorizontal:16,paddingVertical:12}}
                    data={this.props.chattingData}
                    keyExtractor={(_item,index)=> 'key'+index}
                    renderItem={({item,index}) => {
                              if (item.sendBy === sender) {
                                return(
                                    <View>
                                        <CBubbleOthers onLongPress={()=>{this.setState({isOptionShow:true, indexChat: index})}} message={item.chattingContent} times={item.time} />
                                    </View>
                                )
                              }else{
                                return(
                                    <View>
                                        <CBubbleMe message={item.chattingContent} times={item.time} />
                                    </View>
                                )
                              }
                          }}
                    />
                    <COptions isVisible={this.state.isOptionShow} 
                        onDelete={()=>{
                            onDeleteChat(this.props.chattingData,this.state.indexChat,user1Profile,user2Profile)
                            this.setState({isOptionShow:false})
                        }} 
                        onBack={()=>this.setState({isOptionShow:false})} 
                        onBackdropPress={()=>{this.setState({isOptionShow:false})}} />
                    <CInputChatting 
                        value={this.state.chatContentSend}
                        onChangeText={(chatContentSend)=>this.setState({chatContentSend})} 
                        onSend={()=>{
                            sendChat(user1Profile,user2Profile,chatContentSend,sender)
                            this.setState({chatContentSend:''})
                        }} />
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    appbar:{
        backgroundColor: primaryColor,
        height:72,
        borderBottomEndRadius: 40,
        borderBottomStartRadius: 40 ,
        flexDirection: 'row',
        alignItems:'center',
        padding:18
    },
    avatar:{
        height:50,
        width: 50,
        resizeMode: 'cover',
        borderRadius: 25,
        marginEnd:12
    }
})

const mapStatetoProps = (state) =>{
    return{
        uidUser2: state.InputReducer.uidUser2,
        uidUser1: state.FirebaseReducer.userProfile.uid,
        sender: state.FirebaseReducer.userProfile.email,
        chattingData : state.ChatReducer.chattingData,
        user1Profile : state.FirebaseReducer.userProfile,
        unreadChatKey : state.HomeReducer.unreadChatKey
    }
  }

const mapDispatchtoProps = (dispatch) => {
    return{
        getProfileUser : () => {dispatch()},
        getChatting : (uid1,uid2) => {dispatch(getChatting(uid1,uid2))},
        resetDataChat : () => {dispatch({
            type: RESET_CHATTING_DATA
        })}
    }
}



export default connect(mapStatetoProps,mapDispatchtoProps)(ChattingScreen)

