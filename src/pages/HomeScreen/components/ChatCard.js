import React, { Component } from 'react'
import { Image, Text, TouchableNativeFeedback, View } from 'react-native'
import { accentColor, primaryColor, screenWidth, secondaryColor, whiteColor } from '../../../helper/Constant'
import { dummyAvatar } from "../../../assets";

export default class ChatCard extends Component {
    constructor(props){
        super(props)
        this.state= {
            userProfile : {}
        }
    }

    render() {
        const {onPress,miniChat,name,avatarUrl,countUnread,time} = this.props
        return (
            <TouchableNativeFeedback onPress={onPress} >
                <View style={{height:77,backgroundColor:accentColor,marginBottom:8,flexDirection:'row',alignItems:'center', paddingHorizontal:14, borderRadius:4}}>
                    <Image style={{height:55, width:55, resizeMode: 'cover', borderRadius:30, marginEnd:12}} source={{uri:avatarUrl}} />
                    <View style={{height:50}}>
                        <Text style={{fontSize:18, fontWeight:'bold',color:secondaryColor}}>{name}</Text>
                        <Text numberOfLines={1} style={{fontSize:12,color:secondaryColor,marginStart:4,maxWidth:screenWidth * 0.6,marginTop:4}}>{miniChat}</Text>
                    </View>
                    <View style={{position:'absolute', end: 12,alignItems:'center'}}>
                        <Text>{time}</Text>
                        {
                            countUnread > 0 && (
                                <View style={{backgroundColor:primaryColor,padding:4,borderRadius:50,minWidth:28, alignItems:'center',marginTop:8}}>
                                    <Text style={{color:whiteColor}}>{countUnread}</Text>
                                </View>
                            )
                        }
                    </View>

                </View>
            </TouchableNativeFeedback>
        )
    }
}
