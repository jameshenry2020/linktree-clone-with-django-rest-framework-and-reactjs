import React, {useState, useRef, useEffect} from 'react'
import { Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginUserMutation} from "../features/auth/apiAuthSlice"
import { login} from "../features/auth/userSlice"

const Login = () => {
  const token=JSON.parse(localStorage.getItem('access_token'))
  const user=JSON.parse(localStorage.getItem('user'))
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [loginUser, { data:result, isLoading, isSuccess, isError, error}]=useLoginUserMutation()
  const usernameRef=useRef()
  const passwordRef=useRef()

  const handleSubmit=async (e)=>{
      e.preventDefault()
      const data={
        username:usernameRef.current.value,
        password: passwordRef.current.value
      }
      if (data.username && data.password) {
         await loginUser(data).unwrap()

      }
        
      
  }
  useEffect(() => { 
    if (!isLoading && isSuccess) {
      console.log(result)
      dispatch(login(result))
      navigate(`/admin/${result.username}`, {replace:true})
    }    
  }, [isSuccess, navigate])

  
  useEffect(() => {
     if(token){
      navigate(`/admin/${user.username}`, {replace:true})
     }
  }, [token, user, navigate])
  
  
  

  return (
    <div className="auth-container">    
          <Form className='auth-form' onSubmit={handleSubmit}>
          
           <div className="Auth-form-content">
           {isError && (
              <span className='py-1 mx-auto text-danger text-center' role='alert'>{error.data.detail}</span>
            )}
          <h3 className="Auth-form-title">Sign In</h3>
           <Form.Group controlId='username' className='mt-3'>
             <Form.Label>Username</Form.Label>
             <Form.Control 
              type='text' 
              className='mt-1' 
              placeholder='Enter your Username'
              ref={usernameRef}/>
              {error?.data?.username &&<span className=' text-danger text-center py-1 px-2'>{error.data.username[0]}</span>}
           </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type='password' 
                  placeholder='Enter your password'
                  ref={passwordRef}/>
            </Form.Group>
            <div className="d-grid gap-2 mt-3">
            <Button type='submit' variant='primary'>Submit</Button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <Link to={"/password-reset"}>password?</Link>
          </p>
        </div>
          </Form>
          

          
    
    </div>
  )
}

export default Login