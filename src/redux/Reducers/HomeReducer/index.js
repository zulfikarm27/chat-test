import { SET_LIST_MESSAGES ,SET_UNREAD_CHAT_KEY} from "../../../helper/Constant"

const initialState = {
    listMessages : [],
    unreadChatKey : []
}

const HomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST_MESSAGES:
            return{
                ...state,
                listMessages : action.payload
            }

        case SET_UNREAD_CHAT_KEY:
            return{
                ...state,
                unreadChatKey : action.payload
            }
    
        default:
            return state
    }

}

export default HomeReducer