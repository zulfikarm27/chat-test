import {combineReducers} from 'redux';
import ChatReducer from './ChatReducer';
import FirebaseReducer from './FirebaseReducer';
import HomeReducer from './HomeReducer';
import InputReducer from './InputReducer';

const Reducers = combineReducers({FirebaseReducer, InputReducer, ChatReducer,HomeReducer});
export default Reducers