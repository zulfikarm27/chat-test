import auth from '@react-native-firebase/auth';
import { SET_LOGIN } from '../../helper/Constant';
import {Store} from '../../redux/Store';
import {replaceTo, showMessage} from '../GlobalAction';


export const onButtonLoginClick = (inputUser, inputPassword, navigation) => {
console.log("masuk action")
  fetch('http://192.168.100.42:3000/users')
  .then(response => response.json())
  .then(users => {
    console.log(users)
    console.log(inputUser)
    const user = users[0]
    if (inputUser == user.username && inputPassword == user.password ){
    replaceTo(navigation, 'Home');
  }else{
    showMessage('username atau password salah');
  }})
  .catch(error=> console.log(error))
};