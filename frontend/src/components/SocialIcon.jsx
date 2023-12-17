import React, {useState} from 'react'
import { Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { EditSocialIconModal } from "./";

const SocialIcon = ({text, icon, id, social_url}) => {
  const [showSocialEditModal, setShowSocialEditModal]=useState(false)
  const handleShowEditModal=()=>{
    setShowSocialEditModal(true)
}
  return (
    <>
    <Stack direction='horizontal' gap={3} className=' py-1 mb-1 align-items-baseline border'>
        <div className='d-flex' style={{fontSize:'20px'}}>
            <span className='mr-2' style={{width:'40px', height:'40px', textAlign:'center', marginRight:'10px'}}>
              <img src={`http://localhost:8000${icon}`} alt="" style={{width:'100%', height:'100%'}} />
            </span>
            <span className='font-weight-bold'>{text}</span>
        </div>
        <div className='d-flex ms-auto'>
            <span onClick={handleShowEditModal} className='mr-2' style={{width:'30px', height:'30px', textAlign:'center', fontSize:'20px', cursor:'pointer'}}><FontAwesomeIcon icon={faEdit} /></span>
            <span  style={{width:'30px', height:'30px', textAlign:'center', fontSize:'20px', cursor:'pointer'}}><FontAwesomeIcon icon={faTrashCan} color='#d6401e'/></span>
        </div>
    </Stack>
     <EditSocialIconModal item={social_url} icon_id={id} show={showSocialEditModal} handleClose={()=>setShowSocialEditModal(false)} />
    </>
  )
}

export default SocialIcon