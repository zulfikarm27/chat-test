import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {primaryColor, secondaryColor, whiteColor} from '../../../helper/Constant';
import CButton from "../../../components/CButton";

export default class CModalLogOut extends Component {

  render() {
      const{onCencel,onLogout}=this.props
    return (
      <Modal {...this.props}  >
        <View
          style={{
            backgroundColor: primaryColor,
            height: 255,
            width: 300,
            alignSelf: 'center',
            borderRadius:20
          }}>
          <Text style={{textAlign:'center',marginTop:28, fontSize:18, fontWeight:'bold',color:secondaryColor}}>Log out</Text>
          <Text style={{textAlign:'center',marginTop:41,color:secondaryColor}}>You will be returned to the LoginScreen</Text>
          <View style={{flexDirection: 'row', marginTop:64, justifyContent:'space-evenly'}}>
              <CButton color={whiteColor} title="CENCEL" fontColor={primaryColor} onPress={onCencel}/>
              <CButton color={secondaryColor} title={"LOGOUT"} fontColor={primaryColor} onPress={onLogout} />
          </View>
        </View>
      </Modal>
    );
  }
}
