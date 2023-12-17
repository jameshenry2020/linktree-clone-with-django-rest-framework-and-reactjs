import React, {useState, useEffect} from 'react'
import { Modal, Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useEditLinkMutation,  } from "../features/user/apiUserSlice";

const EditLinkModal = ({show, handleClose, item}) => {
    
    //get the id of the link 
    //retrieve the link
     console.log(item)
    
    //create default state of the form value to be the retriev data
    const [editLink, {isLoading, isSuccess}]=useEditLinkMutation()
    const [link_name, setLinkName]=useState(item.link_name)
    const [link, setLink]=useState(item.link)

    const handleSubmit=async ()=>{
        if (link_name && link) {
            await editLink({id:item.id, link_name, link})       
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
                <Modal.Title>Edit Link</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId='link_name' className='mb-2'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text' required placeholder='' onChange={(e)=> setLinkName(e.target.value)} value={link_name}   />
                </Form.Group>
                <Form.Group controlId='link' className='mb-2'>
                    <Form.Label>Url</Form.Label>
                    <Form.Control type='text' required placeholder='' onChange={(e)=>setLink(e.target.value)} value={link} />
                </Form.Group>
                <div className='d-flex justify-content-end'>
                    <Button variant='primary' type='submit'>Add</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>

    
  )
}

export default React.memo(EditLinkModal)