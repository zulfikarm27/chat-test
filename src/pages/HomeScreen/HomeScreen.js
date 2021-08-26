import React, {Component} from 'react';
import { FlatList, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {primaryColor, screenWidth, SET_LOGIN, SET_ONLINE,SET_UID, SET_UID_USER_2, SET_UNREAD_CHAT_KEY, whiteColor} from '../../helper/Constant';
import {dummyAvatar} from '../../assets';
import { onLogout, logChat } from './action';
import { connect } from 'react-redux';
import CLogout from './components/CLogout';
import CModalLogOut from './components/CModalLogOut';
import CBubbleMe from './components/cBubbleMe';
import CBubbleOthers from './components/cBubleOthers';
import CInputChatting from './components/cInputChatting';
import { clearUnreadMsg, getChatting, onDeleteChat, sendChat } from './action';
import COptions from './components/cOptionChat';
import _ from 'lodash';


class HomeScreen extends Component {
  constructor(props){
    super(props)
    this.state= {
        isVisible: false,
        user2Profile:{
          avatarUrl: 'https://www.vippng.com/png/detail/416-4161690_empty-profile-picture-blank-avatar-image-circle.png'
      },
      chatContentSend:'',
      isOptionShow: false,
      indexChat : 0,
      chatUser :[],
      itemUser : [{'sendBy': 'other', 'messages' : 'Halo'}],
      time:'',
      dataBot: []
    }
  }

  componentDidMount() {
    fetch('http://192.168.100.42:3000/bot')
    .then(response => response.json())
    .then(data => {
      this.setState({
        dataBot : data
      })
      console.log('data masuk',data)
      })
    .catch(error=> console.log(error))
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      this.setState({time : hours + ':' + minutes});
      console.log('jam',this.state.time)

  }

  getTimes = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    this.setState({time : hours + ':' + minutes});
  }

  distanceCheck = (s1, s2) => {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;

      for (var j = 0; j <= s2.length; j++) {
        if (i == 0){
          costs[j] = j;
        }else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  compare = (s1, s2) => {
    s1 = s1.toString();
    s2 = s2.toString();
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1;
    }
    // console.log('longerlength',longerLength)
    return (longerLength - this.distanceCheck(longer, shorter)) / parseFloat(longerLength) *100;
  }

  checkerChat = (data) =>{
    let dataChat = this.state.dataBot.map(datas =>datas.question)
    var percentage = []
    console.log('databot masuk di loop',dataChat)
 
     for( var i = 0; i <= dataChat.length -1; i++){
      //  console.log('loop bor', dataChat[i])
       if (this.compare(data,dataChat[i]) >=80){
         tmp = (this.compare(data,dataChat[i]))
         var id = i
         percentage.push({id , tmp})
        //  console.log('loop if',percentage)
       }
     }
     return percentage
  }

  checkingChat = (data) => {
    let dataAnswer = this.state.dataBot.map(datas => datas.answer)
    let tmps = this.checkerChat(data)
    let tmpss = tmps.map(datas => datas)
    // let nearVal = tmpss.pop()
    let max = Math.max(...tmpss.map(({ tmp }) => tmp));
    let nearVal = tmpss.find(({ tmp }) => tmp === max);

    console.log('emang dah',nearVal)
    let id = _.get(nearVal, 'id' || 0)
    let percentage = _.get(nearVal, 'tmp' || 0)
    console.log('percentage',percentage)
    if (percentage >=80){
      console.log('masuk if print')
      var sender = {'sendBy' : 'sender', 'messages' : this.state.chatContentSend, 'time' : this.getTimes()}
      var bot = {'sendBy' : 'other', 'messages' : dataAnswer[id], 'time' : this.getTimes()}
      this.setState({
       chatContentSend:'',
     itemUser :[...this.state.itemUser,sender,bot]})
    }else{
      var sender = {'sendBy' : 'sender', 'messages' : this.state.chatContentSend, 'time' : this.getTimes()}
      var bot = {'sendBy' : 'other', 'messages' : 'Mohon Maaf Pertanyaan anda tidak bisa terjawab silahkan coba lagi', 'time' : this.getTimes()}
      logChat(this.state.chatContentSend)
      this.setState({
      chatContentSend:'',
      itemUser :[...this.state.itemUser,sender,bot]})
    }
  }

  render() {
    return (
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View style={styles.header} />
        <View style={styles.contentHeader}>
          <Image style={styles.avatar} source={dummyAvatar} />
          <View>
              <Text numberOfLines={1} style={styles.textHead}>admin</Text>
              <Text style={styles.textBio}>Be Dev Be Success</Text>
          </View>
        </View>
        <FlatList
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                    onLayout={() => this.flatList.scrollToEnd({animated: true})}
                    style={{paddingHorizontal:16,paddingVertical:12}}
                    data={this.state.itemUser}
                    keyExtractor={(_item,index)=> 'key'+index}
                    renderItem={({item,index}) => {
                              if (item.sendBy == 'sender') {
                                return(
                                    <View>
                                        <CBubbleOthers message={item.messages} times={item.time || this.state.time} />
                                    </View>
                                )
                              }else{
                                return(
                                    <View>
                                        <CBubbleMe message={item.messages} times={item.time || this.state.time} />
                                    </View>
                                )
                              }
                          }}
                    />
                    <COptions isVisible={this.state.isOptionShow} 
                        onDelete={()=>{
                            onDeleteChat()
                            this.setState({isOptionShow:false})
                        }} 
                        onBack={()=>this.setState({isOptionShow:false})} 
                        onBackdropPress={()=>{this.setState({isOptionShow:false})}} />
                    <CInputChatting 
                        value={this.state.chatContentSend}
                        onChangeText={(chatContentSend)=>this.setState({chatContentSend})} 
                        onSend={()=>{this.checkingChat(this.state.chatContentSend)}} />
        {/* <CFab right={21} top={87} onPress={()=>{this.props.navigation.navigate('Contact')}}/> */}
        <CLogout onPress={()=>{this.setState({isVisible:true})}} />
        <CModalLogOut isVisible={this.state.isVisible} onCencel={()=>this.setState({isVisible:false})} 
          onLogout={()=> {
            onLogout(this.props.navigation)}} />
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


export default connect()(HomeScreen)