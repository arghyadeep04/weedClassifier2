// import { userActionTypes } from "./user.types";

import { inputActionTypes } from "./input.types";

const defaultState={imageUrl:"",loading:false};

export const inputReducer=(currentState=defaultState,action)=>{
    switch (action.type) {
        case inputActionTypes.setImgUrl:
            return {...currentState,imageUrl:action.payload}
        case inputActionTypes.setInputLoading:
            return {...currentState,loading:action.payload}
        default:
            return currentState
    }
}