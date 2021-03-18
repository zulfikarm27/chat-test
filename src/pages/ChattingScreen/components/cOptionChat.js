import React, { Component } from 'react'
import { Text, TouchableNativeFeedback, View,TouchableOpacity } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { whiteColor } from '../../../helper/Constant'

export default class COptions extends Component {
    render() {
        const {isVisible,onDelete,onBackdropPress,onBack} = this.props
        return (
            <ReactNativeModal isVisible={isVisible} onBackdropPress={onBackdropPress} onBackButtonPress={onBack} >
                <TouchableOpacity onPress={onDelete}>
                    <View style={{backgroundColor:whiteColor, paddingVertical:14, paddingHorizontal:32, borderRadius:6}}>
                        <Text>Delete Chat</Text>
                    </View>
                </TouchableOpacity>
            </ReactNativeModal>
        )
    }
}
