import { apiSlice } from "../../app/api/apiSlice";



export const apiAuthSlice=apiSlice.injectEndpoints({
    endpoints:(build) =>({
        getNiches:build.query({
          query: () => '/niches/'
        }),
        loginUser: build.mutation({
          query: (credential) => ({
            url:'/login/',
            method: 'POST',
            body: {...credential}
          }),
          invalidatesTags: ['User'],
          async onQueryStarted(
            arg,
            { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
          ) {}, 
        }),
        registerUser: build.mutation({
            query: credential => ({
                url:'/register/',
                method:'POST',
                body: {...credential}
            }),
            invalidatesTags:['User']
        }),
        activateEmail: build.mutation({
           query: ({ token }) => ({
            url:'/email-verify/',
            method: 'POST',
            body: token
           })
        }),
        passwordReset: build.mutation({
          query: ({dt}) => ({
           url:'/password-reset/',
           method: 'POST',
           headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
           body: {"email":dt}
          })
       }),
        setPassword: build.mutation({
            query: (data) => ({
              url:'/set-new-password/',
              method:'PATCH',
              body: {...data}
            })
        }),
        addProfileInfo: build.mutation({
          query: infoData =>({
            url:'/user/update_profile/',
            method:'PUT',
            body:{...infoData},
            invalidatesTags:['User']
          })
        })

    })
})


export const {
  useLoginUserMutation, 
  useRegisterUserMutation, 
  useActivateEmailMutation,
  useGetNichesQuery,
  useAddProfileInfoMutation,
  usePasswordResetMutation, 
  useSetPasswordMutation }=apiAuthSlice