import { createSelector } from "reselect"

const inputSelector=state=>state.input
export const selectImageUrl=createSelector(
    [inputSelector],
    (input)=>{
        return input.imageUrl
    }
)

export const selectInputLoading=createSelector(
    [inputSelector],
    (input)=>{
        return input.loading
    }
)