import React,{useState} from 'react'
import { Card, Stack, Button } from "react-bootstrap";
import { EditLinkModal } from "../components";
import { useDeleteLinkMutation, } from "../features/user/apiUserSlice";

const LinkDetailCard = ({linkDetail}) => {
    const {link, link_name, id}=linkDetail
    const [showEditModal, setShowEditModal]=useState(false)
    const [deleteLink, {isSuccess}]=useDeleteLinkMutation()
  const handleEdit=()=>{
      setShowEditModal(true)
  }
  const handleDelete = async ()=>{
            await deleteLink(id)
  }
  return (
    <>
    <Card style={{width:'100%', borderRadius : '20px', marginBottom:'10px'}}>
        <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
                <div className='py-1'>
                    <p className='mb-0' style={{fontSize:'16px', fontFamily:'sans-serif', fontWeight:'bold'}}>{link_name}</p>
                    <p className='mb-0' style={{fontSize:'16px', fontFamily:'sans-serif', fontWeight:'bold'}}>{link}</p>
                </div>
                <div className='py-1'>
                    <Stack direction='horizontal' gap={4}>
                        <Button onClick={handleEdit}>Edit</Button>
                        <Button onClick={handleDelete}>Delete</Button>
                    </Stack>
                </div>
            </div>
        </Card.Body>
    </Card>

     <EditLinkModal item={linkDetail} show={showEditModal} handleClose={()=>setShowEditModal(false)} />
    </>

  )
}

export default LinkDetailCard