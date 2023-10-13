import { inputActionTypes } from "./input.types"

export const setImageUrl=(url)=>{
    return {type:inputActionTypes.setImgUrl,payload:url}
}

export const setInputLoading=(bool)=>{
    return {type:inputActionTypes.setInputLoading,payload:bool}
}