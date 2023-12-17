import axios from 'axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { login, logout, receiveToken } from "../../features/auth/userSlice";



const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    prepareHeaders: (headers, { getState, endpoint }) => {
        const token = getState().auth.access_token

        if (token && endpoint !== '/token/refresh') {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    },
    // This allows server to set cookies
})

const baseQueryWithReauth = async ( args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 403 ) {
        // try to get a new token
        const retoken = api.getState().auth?.refresh_token
        const refreshResult = await baseQuery(
            { url: '/token/refresh/', method: 'POST', body: {refresh: retoken } },
            api,
            extraOptions
        )
         
        const response = refreshResult.data
        if (response) {
            // store the new token
            console.log(response)
           const user= api.getState().auth.user
           const reftoken=api.getState().auth.refresh_token
            const token=response.access
            api.dispatch(receiveToken(token))
            // retry the initial query
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }
    return result
}

 export const apiSlice=createApi({
    baseQuery:baseQueryWithReauth,
    tagTypes:['User', 'Links', 'SocialIcon'],
    endpoints: builder =>({})
})
