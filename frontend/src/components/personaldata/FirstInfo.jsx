import React from 'react'
import { Form } from "react-bootstrap";

const FirstInfo = ({formData, setFormData}) => {
  return (
    <>
    <Form.Group className='mb-3' controlId='name'>
        <Form.Label>Your Names</Form.Label>
        <Form.Control
         type='text'
         placeholder='enter your names'
         name='names'
         value={formData.names}
         onChange={(event)=> setFormData({ ...formData, names: event.target.value })} />
    </Form.Group>    
    </>
  )
}

export default FirstInfo