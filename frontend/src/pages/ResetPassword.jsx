import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Form, Button, Spinner } from "react-bootstrap";
import { useSetPasswordMutation } from "../features/auth/apiAuthSlice";


const ResetPassword = () => {
  const navigate=useNavigate()
  const {uid, token}=useParams()
  const [newpasswords, setNewPassword]=useState({
    password:"",
    confirm_password:"",
  })
  const [setPassword, {isLoading, isSuccess}]=useSetPasswordMutation()
  const {password, confirm_password}=newpasswords

  const handleChange=(e)=>{
    setNewPassword({...newpasswords, [e.target.name]:e.target.value})
}

const data={
  "password":password,
  "confirm_password":confirm_password,
  "uidb64":uid,
  "token": token,
}


const handleSubmit =async(e)=>{
    e.preventDefault()
    try {
        console.log(data)
        if (data) {
            await setPassword(data).unwrap()
        } 
    } catch (err) {
        console.log("an error has occur", err)
    }   
}

    useEffect(() => {
      if (!isLoading && isSuccess) {
          navigate("/login", {replace:true})
          toast.success("password reset successfully")
      }
    
    }, [isSuccess, navigate])
    

  return (
    <div className='section-container-1'>
        <div className='mt-4 w-100'>
        <h2 className='text-center mb-4'>Enter your New Password</h2>
            <Form className='w-50 mx-auto py-4 px-5 bg-white' onSubmit={handleSubmit}>
                  {isLoading && (
                    <Spinner animation='border' variant='dark'/>
                  )}
                <Form.Group className='mb-4'>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type='password' name='password' value={password} onChange={handleChange} placeholder='Enter your New Password'/>
                </Form.Group>
                <Form.Group className='mb-4'>
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control type='password' name='confirm_password' value={confirm_password} onChange={handleChange} placeholder='Enter your New Password'/>
                </Form.Group>
                <Button type='submit' variant='primary'>Save</Button>
            </Form>
        </div>
    </div>
  )
}

export default ResetPassword