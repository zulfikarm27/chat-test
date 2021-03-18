import {Dimensions} from 'react-native';

//Color Environment
export const primaryColor = '#24BAD1';
export const secondaryColor = '#141E65';
export const accentColor = '#EBEBFA';
export const commonTextColor = '#A0A0B8';
export const whiteColor = '#FFFFFF';
export const redColor = '#F94659';
export const colorBubbleDate = '#C4C4C4'
export const colorBubbleMe = '#FFF3CC'
export const colorBubbleOthers = '#EBEBFA'


//Screen measurement
export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;


// redux variable
export const VALIDATION = "validation";
export const USERNAME_VALIDATION = "username_validation"
export const PASSWORD_VALIDATION = "password_validation"
export const EMAIL_VALIDATION = "email_validation"
export const BIODATA_VALIDATION = "biodata_validation"
export const SET_LOGIN = "set_login"
export const SET_ONLINE = "set_online"
export const SET_UID = "set_uid"
export const SET_UID_USER_2 = "set_uid_user_2"
export const USER_PROFILE = "user_profile"
export const SET_CHATTING_DATA = "set_chatting_data"
export const RESET_CHATTING_DATA = "reset_chatting_data"
export const SET_LIST_MESSAGES = "set_list_messages"
export const SET_UID_OTHER_USERS = "set_uid_other_users"
export const SET_UNREAD_CHAT_KEY = "set_unread_chat_key"
