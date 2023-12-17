import React, {useRef, useState, useEffect} from 'react'
import { Modal, Form, Button } from "react-bootstrap";
import { useAddLinkMutation } from "../features/user/apiUserSlice";

const AddLinkModal = ({show, handleClose}) => {
    const [title, setTitle]=useState('')
    const [url_link, setUrlLink]=useState('')
    const [addLink, { isLoading, isSuccess}]=useAddLinkMutation()
    
     
    const handleSubmit=async (event)=>{
        event.preventDefault(); 
        if (title && url_link) {
            console.log({'link_name':title, 'link':url_link})
            try {
                await addLink({'link_name':title, 'link':url_link})
                setTitle('')
                setUrlLink('')
            } catch (err) {
                console.log("something when wrong ", err)
            }
        }else{
            console.log("can not get data")
        }
                
    
    }

    useEffect(() => {
      if (isSuccess) {
        handleClose()
      }
       
    }, [isSuccess])
    
  return (
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Link</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group  className='mb-2'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text' value={title} onChange={(e)=> setTitle(e.target.value)} required placeholder='' />
                </Form.Group>
                <Form.Group className='mb-2'>
                    <Form.Label>Url</Form.Label>
                    <Form.Control type='text' value={url_link} onChange={(e)=> setUrlLink(e.target.value)} required placeholder='' />
                </Form.Group>
                <div className='d-flex justify-content-end'>
                    <Button variant='primary' type='submit'>Add</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>

    
  )
}

export default AddLinkModal