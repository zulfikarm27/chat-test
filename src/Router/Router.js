import React, { Component } from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../pages/LoginScreen/LoginScreen';
import SplashScren from '../pages/SplashScreen/SplashScren';
import RegisterScreen from '../pages/RegisterScreen/RegisterScreen';
import HomeScreen from '../pages/HomeScreen/HomeScreen';
import messaging from "@react-native-firebase/messaging";
import ChattingScreen from '../pages/ChattingScreen';

const Stack = createStackNavigator()
const hide = {headerShown:false}

class Router extends Component {

    componentDidMount(){
        this.requestUserPermission()
    }

    requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
      }
    
    render() {
        return (
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen name="Splash" component={SplashScren} options={hide} />
                <Stack.Screen name="Home" component={HomeScreen} options={hide} />
            </Stack.Navigator>
        )
    }
}

export default Router
