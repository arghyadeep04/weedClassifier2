import { alertActionTypes } from "./alerts.types"

export const setMessage=(message)=>{
    return {type:alertActionTypes.setMessage,payload:message}
}

export const setVisible=(vis)=>{
    return {type:alertActionTypes.setVisible,payload:vis}
}