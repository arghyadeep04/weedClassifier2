// import { userActionTypes } from "./user.types";

import { outputActionTypes } from "./output.types";

const defaultState={output:null,loading:false};

export const outputReducer=(currentState=defaultState,action)=>{
    switch (action.type) {
        case outputActionTypes.setOutput:
            return {...currentState,output:action.payload}
        case outputActionTypes.setOutputLoading:
            return {...currentState,loading:action.payload}
        default:
            return currentState
    }
}