import { createSlice } from "@reduxjs/toolkit"


const Channel =  createSlice({
    name:"Channel",
    initialState:{},
    reducers:{
        channelMethod:(state,action)=>{
            state = action.payload
            return state
        }
    }
})

export const {channelMethod} = Channel.actions
export default Channel.reducer