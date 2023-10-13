import { userActionTypes } from "./user.types"

export const setuserToken=(token)=>{
    return {type:userActionTypes.setuserToken,payload:token}
}

export const setHistory=(history)=>{
    return {type:userActionTypes.setHistory,payload:history}
}