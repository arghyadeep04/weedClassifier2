import { alertActionTypes } from "./alerts.types";

const defaultState={message:"",visible:false};

export const alertReducer=(currentState=defaultState,action)=>{
    switch (action.type) {
        case alertActionTypes.setMessage:
            return {...currentState,message:action.payload}
        case alertActionTypes.setVisible:
            return {...currentState,visible:action.payload}
        default:
            return currentState
    }
}