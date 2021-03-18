import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {primaryColor, secondaryColor, whiteColor} from '../../helper/Constant';
import CInputForm from '../../components/CInputForm';
import CButton from '../../components/CButton';
import CMargin from '../../components/CMargin';
import { onButtonRegisterClick } from './action';
import { connect } from 'react-redux';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUsername: '',
      inputEmail: '',
      inputPassword: '',
      inputBiodata: '',
    };
  }
  render() {
      const{inputUsername,inputEmail,inputPassword,inputBiodata} = this.state
      const{usernameErrorMsg,emailErrorMsg,passwordErrorMsg,biodataErrorMsg} = this.props.inputState
      const{navigation} = this.props
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: primaryColor}}>
          <View style={styles.container}>
            <Text style={styles.text}>Register</Text>
            <CInputForm
              errorMsg={usernameErrorMsg}
              placeholder="Username"
              onChangeText={(inputUsername) => {
                this.setState({inputUsername});
              }}
            />
            <CInputForm
            errorMsg={emailErrorMsg}
              placeholder="Email"
              onChangeText={(inputEmail) => {
                this.setState({inputEmail});
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
            <CInputForm
            errorMsg={biodataErrorMsg}
              placeholder="Biodata"
              onChangeText={(inputBiodata) => {
                this.setState({inputBiodata});
              }}
            />
            <CMargin height={64} />
            <CButton
              title="REGISTER ACCOUNT"
              color={secondaryColor}
              onPress={() => onButtonRegisterClick(inputUsername,inputEmail,inputPassword,inputBiodata,navigation)}
            />
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
    paddingBottom: 24,
  },
  text: {
    color: whiteColor,
    fontSize: 32,
    marginTop: 32,
  },
});


const mapStatetoProps = (state) => {
    return{
        inputState : state.InputReducer
    }
}

export default connect(mapStatetoProps)(RegisterScreen);