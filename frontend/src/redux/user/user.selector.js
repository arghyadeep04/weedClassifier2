import { createSelector } from "reselect"

const userSelector=state=>state.user
export const selectuserToken=createSelector(
    [userSelector],
    (user)=>{
        return user.userToken
    }
)


export const selectUserHistory=createSelector(
    [userSelector],
    (user)=>{
        return user.history
    }
)