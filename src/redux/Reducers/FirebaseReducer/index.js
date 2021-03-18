import { SET_LOGIN, SET_UID_OTHER_USERS, USER_PROFILE } from "../../../helper/Constant";

const initialState = {
  name: 'Firebase reducer',
  isLogin : false,
  userProfile : {
      name: '',
      biodata: '',
      email:'',
      avatarUrl:'https://images.squarespace-cdn.com/content/5b47794f96d4553780daae3b/1531516790942-VFS0XZE207OEYBLVYR99/profile-placeholder.jpg?content-type=image%2Fjpeg',
      uid:''
  }
};

const FirebaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE:
      return {
        ...state,
        userProfile:{
          ...action.payload
        }
      };

    case SET_LOGIN :
        return{
            ...state,
            isLogin : action.payload
        }

    default:
      return state;
  }
};

export default FirebaseReducer
