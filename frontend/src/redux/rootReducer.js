import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import storage from 'redux-persist/lib/storage'; //localstorage
import persistReducer from "redux-persist/es/persistReducer";
import { alertReducer } from "./alert/alert.reducer";
import { inputReducer } from "./input/input.reducer";
import { outputReducer } from "./output/output.reducer";
const persistConfig={
    key:'root',
    storage,
    whitelist:["user"] //who will be stored
}

const rootReducer=combineReducers({
    user:userReducer,
    alerts:alertReducer,
    input:inputReducer,
    output:outputReducer
})

export default persistReducer(persistConfig,rootReducer);