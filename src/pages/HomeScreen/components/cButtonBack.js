import React, { Component } from 'react'
import { TouchableNativeFeedback, View } from 'react-native'
import { whiteColor } from '../../../helper/Constant'
import Ionicons from "react-native-vector-icons/Ionicons";

export default class CButtonBack extends Component {
    render() {
        const {onPress} = this.props
        return (
            <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple('#F66',true,18)} onPress={onPress}>
                <View style={{paddingHorizontal:8, borderRadius:20}}>
                    <Ionicons name="chevron-back" color={whiteColor} size={25} />
                </View>
            </TouchableNativeFeedback>
        )
    }
}
