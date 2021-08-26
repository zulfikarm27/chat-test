import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { colorBubbleOthers, screenWidth, secondaryColor } from '../../../helper/Constant'

export default class CBubbleMe extends Component {
    render() {
        const{message,times}=this.props
        return (
            <View style={{paddingTop:14,paddingBottom:8,backgroundColor:colorBubbleOthers, alignSelf:'baseline',paddingHorizontal:12, borderTopEndRadius:17, borderBottomEndRadius:17, borderBottomStartRadius:17, marginBottom:24}}>
                <Text style={{color:secondaryColor,maxWidth:screenWidth*0.7, marginEnd:8,marginBottom:4}}>{message}</Text>
                <Text style={{color:secondaryColor,fontSize:10, textAlign:'right'}}> {times} </Text>
            </View>
        )
    }
}
