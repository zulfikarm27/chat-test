import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {secondaryColor, whiteColor} from '../../../helper/Constant';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class CFab extends Component {
  render() {
    const {top, left, bottom, right, onPress} = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{position: 'absolute', top, left, bottom, right}}>
        <View
          style={{
            backgroundColor: secondaryColor,
            height: 60,
            width: 60,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={30}
            color={whiteColor}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
