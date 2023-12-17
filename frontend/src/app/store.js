import { configureStore,  } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import  authReducer  from "../features/auth/userSlice";
import userReducer from "../features/user/profileSlice";
import { apiSlice } from "./api/apiSlice";

const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authReducer,
        user:userReducer 
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

setupListeners(store.dispatch)

export default store