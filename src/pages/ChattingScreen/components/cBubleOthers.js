import React, { Component } from 'react'
import { Text, TouchableNativeFeedback, View } from 'react-native'
import { colorBubbleMe, colorBubbleOthers, screenWidth, secondaryColor } from '../../../helper/Constant'


export default class CBubbleOthers extends Component {
    render() {
        const{message,times, onLongPress}=this.props
        return (
            <View style={{flexDirection:'row-reverse'}}>
                <TouchableNativeFeedback onLongPress={onLongPress}>
                    <View style={{paddingTop:14,paddingBottom:8,backgroundColor:colorBubbleMe, alignSelf:'baseline',paddingHorizontal:12, borderTopStartRadius:17, borderBottomEndRadius:17, borderBottomStartRadius:17, marginBottom:24}}>
                        <Text style={{color:secondaryColor,maxWidth:screenWidth*0.7, marginEnd:8,marginBottom:4}}>{message}</Text>
                        <Text style={{color:secondaryColor,fontSize:10, textAlign:'right'}}> {times} </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}
