import { createSlice } from "@reduxjs/toolkit";



const initialState={
    profile:{},

}


const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        get_profile:(state, action)=>{
            const {}=action.payload
            state.profile=action.payload
            
        },
    }
})

export const {get_profile} =userSlice.actions


export default userSlice.reducer