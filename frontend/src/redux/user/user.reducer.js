// import { setnews } from "./news.utils";

import { userActionTypes } from "./user.types";

const defaultState={userToken:null,history:[]};

export const userReducer=(currentState=defaultState,action)=>{
    switch (action.type) {
        case userActionTypes.setuserToken:
            return {...currentState,userToken:action.payload}
        case userActionTypes.setHistory:
            return {...currentState,history:action.payload}
        default:
            return currentState
    }
}