import { createSelector } from "reselect"

const outputSelector=state=>state.output
export const selectOutput=createSelector(
    [outputSelector],
    (output)=>{
        return output.output
    }
)

export const selectOutputLoading=createSelector(
    [outputSelector],
    (output)=>{
        return output.loading
    }
)