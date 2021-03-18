import React, {Component} from 'react';
import {View} from 'react-native';

export default class CMargin extends Component {
  render() {
    const {height = 12, width = 0} = this.props;
    return <View style={{height: height, width: width}} />;
  }
}
