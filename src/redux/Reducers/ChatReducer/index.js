import { RESET_CHATTING_DATA, SET_CHATTING_DATA } from "../../../helper/Constant"

const initialState = {
    chattingData : []
}

const ChatReducer = (state = initialState, action ) => {
    switch(action.type){
        case SET_CHATTING_DATA : 
            return{
                ...state,
                chattingData : action.payload
            }

        case RESET_CHATTING_DATA :
            return{
                ...state,
                chattingData: []
            }
        default:
            return state
    }
}

export default ChatReducer