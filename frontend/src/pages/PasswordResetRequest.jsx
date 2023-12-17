import React, {useRef, useEffect} from 'react'
import { Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { usePasswordResetMutation } from "../features/auth/apiAuthSlice";

const PasswordResetRequest = () => {
    const emailRef=useRef()
    const [passwordReset, {isLoading, data:res, isSuccess, isError}]=usePasswordResetMutation()

    const handleSubmit=async (e)=>{
        e.preventDefault()
        const dt=emailRef.current.value
        if (dt){
            await passwordReset({dt})
        }
    }

    useEffect(() => {
      if (!isLoading && isSuccess) {
         toast.success(res.message)
         emailRef.current.value=""
      }
    }, [isSuccess])
    
  return (
    <div className='section-container-1'>
        <div className='mt-4 w-100'>
            <h2 className='text-center mb-4'>Reset your Password</h2>
            <Form className='w-50 mx-auto py-4 px-5 bg-white' onSubmit={handleSubmit}>
                  {isLoading && (
                    <Spinner animation='border' variant='dark'/>
                  )}
                <Form.Group controlId='email' className='mb-2 '>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' ref={emailRef} placeholder='enter your email' />
                </Form.Group>
                <Button type='submit' variant="primary">Submit</Button>
            </Form>
        </div>
    </div>
  )
}

export default PasswordResetRequest