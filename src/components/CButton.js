import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
class CButton extends Component {
  render() {
    const {onPress, title="Button", color = 'tomato', fontSize=14, fontColor="#FFF"} = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.buttonLogin, {backgroundColor: color}]}>
          <Text style={{color: fontColor , fontWeight: 'bold', fontSize}}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default CButton;

const styles = StyleSheet.create({
  buttonLogin: {
    paddingHorizontal: 42,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 8,
  },
});
