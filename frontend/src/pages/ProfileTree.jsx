import React from 'react'
import { useParams } from "react-router-dom";
import { LinkT } from '../components';
import { useGetProfileQuery, useGetLinksQuery,useGetSocialIconsQuery } from "../features/user/apiUserSlice";


const ProfileTree = () => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  const { username }=useParams();
  const {
    data: profile,
    isFetching,
    isSuccess,
  } = useGetProfileQuery(username, {
    refetchOnMountOrArgChange: true,
    skip: false,
    // pollingInterval: 30
  })
 
  const {data:links, isFetching:isLinkFetching, isSuccess:isLinkSuccess}=useGetLinksQuery(username) 
  
  const {data:social_links, isSuccess:isSocialSuccess, isFetching:isSocialFetching}=useGetSocialIconsQuery(username, {
    refetchOnMountOrArgChange: true,
   })


  return (
    <div className='d-flex w-100' style={{minHeight:'100%', background:'#362836', height:'100vh'}}>
      { !isFetching && isSuccess && (
        <div className='mx-auto border px-4 d-flex flex-column align-items-center' style={{width:'50%', paddingTop:'40px'}}>
           <div className='border text-center' style={{width:'100px', height:'100px', borderRadius:'20px'}}>
                <img src={`http://localhost:8000${profile.profile_img}`} alt="" style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'20px'}} />
           </div>
          <span className='py-2 text-white' style={{fontSize:'17px', fontWeight:'bold'}}>{profile.names}</span>
         <h1 className='text-white' style={{fontFamily:'sans-serif', fontSize:'24px', fontWeight:'bold'}}>{profile.occupation}</h1>
         <div className='w-100 d-flex flex-column align-items-center'>
          {!isLinkFetching && isLinkSuccess && (
               links.map((url)=> (
                <LinkT key={url.id} link={url.link} openInNewTab={openInNewTab} name={url.link_name}/>
               ))
          )}
            
         </div>
         <div className='d-flex gap-2 mt-3'>
          {!isSocialFetching && isSocialSuccess && (
            social_links.map((item)=>(
              <div onClick={()=>openInNewTab(item.social_accounts)} className='icon' key={item.id}>
               <img src={`http://localhost:8000${item.social_media.icon}`} alt="" style={{width:'100%', height:'100%'}} />
              </div>
            ))
          )}
          
         </div>
      </div>
      )}
      
    </div>

  )
}

export default ProfileTree