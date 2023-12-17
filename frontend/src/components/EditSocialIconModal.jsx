import React, {useState, useEffect} from 'react'
import { Modal, Form, Button } from "react-bootstrap";
// import data from "../assets/data.json"
import { useEditSocialIconMutation  } from "../features/user/apiUserSlice";

const EditSocialIconModal = ({show, handleClose, item, icon_id}) => {
    const [social_acct, setSocialAcct]=useState(item)
    const [editSocialIcon, {isSuccess, isError, error}]=useEditSocialIconMutation()
       
      const input={'social_accounts':social_acct}
    const handleSubmit= async (e)=>{
          e.preventDefault()
          console.log({'id':icon_id, "account":social_acct})
          if (icon_id  && social_acct) {
            try {
                await editSocialIcon({'id':icon_id, input})
            } catch (err) {
                if (isError) {
                    console.log(error)
                }
                console.log('an error occured', err)
                
            }
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
                <Modal.Title>Edit Social Link</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <div className='mb-3'>
                    <input type="text" placeholder='Edit your social url' value={social_acct} onChange={(e)=> setSocialAcct(e.target.value)}  className='form-control'/>
                </div>
                <div className='d-flex justify-content-end'>
                    <Button variant='primary' type='submit'>Save</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>

    
  )
}

export default EditSocialIconModal