import { apiSlice } from "../../app/api/apiSlice";


export const apiUserSlice=apiSlice.injectEndpoints({
    endpoints: (build)=>({
        getProfile: build.query({
            query: (username) => `/get_profile/${username}/`,
            providesTags: (result, error, id) => [{ type: 'User', id }],
            async onQueryStarted(
                arg,
                {
                  dispatch,
                  getState,
                  extra,
                  requestId,
                  queryFulfilled,
                  getCacheEntry,
                  updateCachedData,
                }
              ) {},
            async onCacheEntryAdded(
                arg,
                {
                  dispatch,
                  getState,
                  extra,
                  requestId,
                  cacheEntryRemoved,
                  cacheDataLoaded,
                  getCacheEntry,
                  updateCachedData,
                }
            ){},
        }),
        uploadPhoto: build.mutation({
            query: img => ({
              url:'/upload_profile_image/',
              method:'PATCH',
              body: img
            })
        }),
        addLink:build.mutation({
          query: (data)=>({
            url:'/add_link/',
            method:'POST',
            body: {...data},
            invalidatesTags: [{ type: 'Links', id: 'LIST' }],
          })
        }),
        getLinks:build.query({
          query: (username) =>`/links/${username}/`,
          providesTags: (result) =>
        // is result available?
            result
              ? // successful query
                [
                  ...result.map(({ id }) => ({ type: 'Links', id })),
                  { type: 'Links', id: 'LIST' },
                ]
              : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                [{ type: 'Links', id: 'LIST' }],
        }),
        editLink:build.mutation({
          query: (linkData)=>({
            url:`edit_link/${linkData.id}/`,
            method: 'PATCH',
            body: linkData
          }),
          invalidatesTags: (result, error, { id }) => [{ type: 'Links', id }],
        }),
        deleteLink: build.mutation({
          query(id) {
            return {
              url: `edit_link/${id}/`,
              method: 'DELETE',
            }
          },
          // Invalidates all queries that subscribe to this Post `id` only.
          invalidatesTags: (result, error, id) => [{ type: 'Links', id }],
        }),
        getMediaIcon:build.query({
          query: () => '/icons/',
          keepUnusedDataFor: 30,
        }),
        addSocialIcon:build.mutation({
          query: (inputData)=> ({
            url:'/add_social_icon/',
            method:'POST',
            body:{...inputData},
            invalidatesTags: (result, error, { id }) => [{ type: 'SocialIcon', id }],
          })
        }),
        getSocialIcons:build.query({
          query: (username) =>`/icons-list/${username}/`,
          providesTags: (result) =>
        // is result available?
            result
              ? // successful query
                [
                  ...result.map(({ id }) => ({ type: 'SocialIcon', id })),
                  { type: 'SocialIcon', id: 'LIST' },
                ]
              : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                [{ type: 'SocialIcon', id: 'LIST' }],
        }),

        editSocialIcon:build.mutation({
          query: ({id, ...iconData})=>({
            url:`edit_icons/${id}/`,
            method: 'PATCH',
            body: iconData
          }),
          invalidatesTags: (result, error, { id }) => [{ type: 'SocialIcon', id }],
        }),
        deleteIcon: build.mutation({
          query(id) {
            return {
              url: `edit_icons/${id}/`,
              method: 'DELETE',
            }
          },
          // Invalidates all queries that subscribe to this Post `id` only.
          invalidatesTags: ['SocialIcon'],
          // invalidatesTags: (result, error, id) => [{ type: 'SocialIcon', id }],
        }),
    })
})


export const { useGetProfileQuery, 
               useUploadPhotoMutation,
               useAddLinkMutation, 
               useGetLinksQuery,
               useDeleteLinkMutation,
              useEditLinkMutation,
              useGetMediaIconQuery,
             useAddSocialIconMutation,
             useGetSocialIconsQuery,
             useEditSocialIconMutation,
             useDeleteIconMutation} = apiUserSlice