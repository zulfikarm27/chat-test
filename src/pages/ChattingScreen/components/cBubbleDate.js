import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { colorBubbleDate, secondaryColor } from '../../../helper/Constant'

export default class CBubbleDate extends Component {
    render() {
        const{date}=this.props
        return (
            <View style={{alignSelf:'center', backgroundColor:colorBubbleDate, paddingHorizontal:14, paddingVertical:6,borderRadius:10, marginBottom:24}}>
                <Text style={{fontSize:10, color:secondaryColor}} > {date} </Text>
            </View>
        )
    }
}
