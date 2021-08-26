import React, { Component } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { colorBubbleOthers, primaryColor, secondaryColor, whiteColor } from '../../../helper/Constant'
import Ionicons from "react-native-vector-icons/Ionicons";

export default class CInputChatting extends Component {
    render() {
        const{onChangeText,onSend,value} = this.props
        return (
            <View style={{paddingHorizontal:16, flexDirection:'row', marginBottom:12,alignItems:'flex-end'}}>
                <View style={{backgroundColor:colorBubbleOthers, flex:1,borderRadius:8, paddingHorizontal:12}}>
                    <TextInput value={value} onChangeText={onChangeText} multiline={true} style={{color:secondaryColor,textAlign:'justify',maxHeight:150}}/>
                </View>
                <TouchableOpacity onPress={onSend}>
                    <View style={{backgroundColor:primaryColor,padding:8,borderRadius:10,marginStart:8,marginBottom:5}}>
                        <Ionicons name="send" color={whiteColor} size={20} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
