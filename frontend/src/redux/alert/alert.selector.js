import { createSelector } from "reselect"

const alertSelector=state=>state.alerts
export const selectAlertMessage=createSelector(
    [alertSelector],
    (alert)=>{
        return alert.message
    }
)

export const selectAlertVisible=createSelector(
    [alertSelector],
    (alert)=>{
        return alert.visible
    }
)