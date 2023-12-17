import { createSlice } from "@reduxjs/toolkit";



const initialState={
    user:JSON.parse(localStorage.getItem('user', null)),
    access_token:JSON.parse(localStorage.getItem('access_token', null)),
    refresh_token:JSON.parse(localStorage.getItem('refresh_token', null)),
    isAuthenticated: localStorage.getItem('access_token') ? true : false,
    re_token:null
  
}


const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state, action)=>{
            const {username, email, access_token, refresh_token}=action.payload
            localStorage.setItem('access_token', JSON.stringify(access_token))
            localStorage.setItem('refresh_token', JSON.stringify(refresh_token))
            localStorage.setItem('user', JSON.stringify({
                username:username,
                email:email
            }))
            state.isAuthenticated=true
            
        },
        logout:(state)=>{
            localStorage.clear()
            state.isAuthenticated=false
            state.user=null
            state.access_token=null
            state.refresh_token=null
        },
        receiveToken: (state, action)=>{
            state.access_token=action.payload
            localStorage.setItem('access_token', JSON.stringify(action.payload))
        }

    }
})

export const {login, logout, receiveToken} =authSlice.actions
export const isAuthenticated=(state)=> state.auth.isAuthenticated

export default authSlice.reducer