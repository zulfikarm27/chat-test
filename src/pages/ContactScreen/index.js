import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ContactPerson from './components/ContactPerson';
import {connect} from 'react-redux';
import {SET_UID_USER_2} from '../../helper/Constant';

class ContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  loadUserFirebase = () => {
    firestore()
      .collection('users')
      .get()
      .then(
        (response) => {
          const dataset = [];
          response.docs.forEach((tes) => {
            dataset.push(tes.data());
          });

          this.setState({data: dataset});
        },
        (error) => {
          console.log(error);
        },
      );
  };

  componentDidMount() {
    this.loadUserFirebase();
  }

  render() {
    const {userProfile} = this.props;

    return (
      <ScrollView>
        <View style={{paddingBottom: 24}}>
          <Text> Chat with your firends </Text>
          {this.state.data.map((item, index) => {
            if (item.email !== userProfile.email && item.uid !== '') {
              return (
                <View key={index}>
                  <ContactPerson
                    onPress={() => {
                      this.props.navigation.replace('Chatting');
                      this.props.setUidUser2(item.uid)
                    }}
                    name={item.name}
                    bio={item.biodata}
                    avatar={item.avatarUrl}
                  />
                </View>
              );
            }
          })}
        </View>
      </ScrollView>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    userProfile: state.FirebaseReducer.userProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUidUser2: (uidUser2) => {
      dispatch({
        type: SET_UID_USER_2,
        payload: uidUser2,
      });
    },
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(ContactScreen);
