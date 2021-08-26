import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import {connect} from 'react-redux';
import { primaryColor, SET_ONLINE, whiteColor } from '../../helper/Constant';
import auth from '@react-native-firebase/auth';


class SplashScren extends Component {
  componentDidMount() {
    setTimeout(() => {
      auth().onAuthStateChanged((user)=>{
          console.log("user loggin:",user)
            this.props.navigation.replace('Home');
            this.props.isOnline(true)
      })

    }, 2000);
  }

  render() {
    return (
      <View style={{flex:1,alignItems: 'center', justifyContent: 'center', backgroundColor:primaryColor}}>
        <Text style={{color: whiteColor, fontWeight:'bold', marginTop:12}}>Chat Bot</Text>
      </View>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    isLogin: state.FirebaseReducer.isLogin,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return{
    isOnline: (isOnline)=>{dispatch({
      type: SET_ONLINE,
      payload: isOnline
    })}
  }
}
export default connect(mapStatetoProps,mapDispatchtoProps)(SplashScren);
