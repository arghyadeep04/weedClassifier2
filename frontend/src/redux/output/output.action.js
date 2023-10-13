import { outputActionTypes } from "./output.types"

export const setOutput=(output)=>{
    return {type:outputActionTypes.setOutput,payload:output}
}

export const setOutputLoading=(bool)=>{
    return {type:outputActionTypes.setOutputLoading,payload:bool}
}