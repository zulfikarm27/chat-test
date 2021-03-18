import React, {Component} from 'react';
import {Text, TouchableNativeFeedback, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {redColor} from '../../../helper/Constant';

export default class CLogout extends Component {
  render() {
    const {onPress} = this.props;
    return (
      <TouchableNativeFeedback onPress={onPress}>
        <View style={{position: 'absolute', top: 15, end: 15}}>
          <Ionicons name={'log-out-outline'} size={25} color={redColor} />
          <Text style={{color: redColor, fontSize: 10}}>OUT</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}
