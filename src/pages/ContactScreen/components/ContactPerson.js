import React, { Component } from 'react'
import { Image, Text, TouchableNativeFeedback, View } from 'react-native'
import { accentColor, screenWidth, secondaryColor } from '../../../helper/Constant'

export default class ContactPerson extends Component {
    render() {
        const imagePlaceholder = "https://images.squarespace-cdn.com/content/5b47794f96d4553780daae3b/1531516790942-VFS0XZE207OEYBLVYR99/profile-placeholder.jpg?content-type=image%2Fjpeg"
        const {onPress,name,bio,avatar = imagePlaceholder} = this.props
        return (
            <TouchableNativeFeedback onPress={onPress} >
                <View style={{height:77,backgroundColor:accentColor,marginBottom:8,flexDirection:'row',alignItems:'center', paddingHorizontal:14, borderRadius:4}}>
                    <Image style={{height:55, width:55, resizeMode: 'cover', borderRadius:30, marginEnd:12}} source={{uri:avatar}} />
                    <View style={{height:50}}>
                        <Text style={{fontSize:18, fontWeight:'bold',color:secondaryColor}}>{name}</Text>
                        <Text numberOfLines={1} style={{fontSize:12,color:secondaryColor,marginStart:4,maxWidth:screenWidth * 0.6,marginTop:4}}>{bio}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}
