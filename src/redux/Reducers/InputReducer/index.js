import {
  BIODATA_VALIDATION,
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  SET_ONLINE,
  SET_UID_USER_2,
  USERNAME_VALIDATION,
  SET_UID
} from '../../../helper/Constant';

const initialState = {
  usernameErrorMsg: '',
  emailErrorMsg: '',
  passwordErrorMsg: '',
  biodataErrorMsg: '',
  isOnline: false,
  uidUser2 : '',
  uid:''
};

const InputReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERNAME_VALIDATION:
      return {
        ...state,
        usernameErrorMsg: action.username,
      };
    case EMAIL_VALIDATION:
      return {
        ...state,
        emailErrorMsg: action.email,
      };
    case PASSWORD_VALIDATION:
      return {
        ...state,
        passwordErrorMsg: action.password,
      };
    case BIODATA_VALIDATION:
      return {
        ...state,
        biodataErrorMsg: action.biodata,
      };

    case SET_ONLINE:
      return{
        ...state,
        isOnline : action.payload
      }

    case SET_UID_USER_2:
      return{
        ...state,
        uidUser2: action.payload
      }

    case SET_UID :
      return{
        ...state,
        uid:action.payload
      }

    default:
      return state;
  }
};

export default InputReducer;
