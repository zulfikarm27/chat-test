import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import {
  primaryColor,
  secondaryColor,
  SET_LOGIN,
  SET_UID,
  whiteColor,
} from '../../helper/Constant';
import CInputForm from '../../components/CInputForm';
import CButton from '../../components/CButton';
import CMargin from '../../components/CMargin';
import {onButtonLoginClick} from './action';
import {connect} from 'react-redux';
import { firebase } from '@react-native-firebase/firestore';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUser: '',
      inputPassword: '',
    };
  }

  _validation = () => {

    let isValid = true;
    // const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const {inputUser, inputPassword} = this.state;

    if (inputUser.trim() === '') {
      isValid = false;
      this.setState({emailErrorMsg: 'Username Harus Di isi'});
    } else {
      this.setState({emailErrorMsg: ''});
    }

    if (inputPassword.length < 4) {
      isValid = false;
      this.setState({
        passwordErrorMsg: 'Password harus di isi',
      });
    } else {
      this.setState({passwordErrorMsg: ''});
    }

    if (isValid) {
      onButtonLoginClick(inputUser, inputPassword, this.props.navigation);
    }
  };

 

  render() {
    const {emailErrorMsg, passwordErrorMsg} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{backgroundColor: primaryColor}}>
          <View style={styles.container}>
            <Text style={styles.text}>Login</Text>
            <CInputForm
              errorMsg={emailErrorMsg}
              placeholder="Username"
              onChangeText={(inputUser) => {
                this.setState({inputUser});
              }}
            />
            <CInputForm
              errorMsg={passwordErrorMsg}
              placeholder="Password"
              spyMode
              onChangeText={(inputPassword) => {
                this.setState({inputPassword});
              }}
            />
            <CMargin height={24} />
            <CButton
              color={secondaryColor}
              title={'LOGIN'}
              onPress={() => this._validation()}
            />
            <CMargin />
            {/* <CButton
              fontColor={secondaryColor}
              color={whiteColor}
              title={'REGISTER'}
              onPress={() => this.props.navigation.navigate('Register')}
            /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 72,
  },
  text: {
    color: whiteColor,
    fontSize: 32,
    marginTop: 32,
  },
});

const mapStatetoProps = (state) => {
  return {
    stateReducer: state.FirebaseReducer,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    setLogin: (isLogin) => {
      dispatch({
        type: SET_LOGIN,
        payload: isLogin,
      });
    },
  };
};

export default connect(mapStatetoProps,mapDispatchtoProps)(LoginScreen);
