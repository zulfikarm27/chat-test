import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, createStore } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import thunk from "redux-thunk";
import Reducers from "../Reducers";

const configPersist = {
    key : 'root',
    storage: AsyncStorage,
    balcklist : ["InputReducer", "ChatReducer", "HomeReducer","FirebaseReducer"]
}

const reducerPersist = persistReducer(configPersist,Reducers)
const Store = createStore(reducerPersist,applyMiddleware(thunk))
const Persistor = persistStore(Store)

export{Store, Persistor}