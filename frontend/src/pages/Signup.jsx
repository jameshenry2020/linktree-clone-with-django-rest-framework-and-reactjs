import React, { useState, useEffect } from "react"
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../features/auth/apiAuthSlice";
import { login } from "../features/auth/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Signup=()=>{
  const token=JSON.parse(localStorage.getItem('access_token', null)) //to check if the user is already login
  const loginUser=JSON.parse(localStorage.getItem('user', null))
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [userData, setUserData]=useState({
    username:'',
    email:'',
    password:'',
    password2:''
  })
const [registerUser, {data:user, isLoading, isSuccess, error, isError} ]=useRegisterUserMutation()

  const handleOnChange=(event)=>{
     setUserData((prev => ({
          ...prev, [event.target.name]:event.target.value
     })))
  }
  const {username, email, password, password2}=userData

  const canSubmit=[username, email, password, password2].every(Boolean) && !isLoading
   
  const handleSubmit= async (event)=>{
      event.preventDefault();
      if (canSubmit) {
        try {
          await registerUser(userData).unwrap()
          setUserData({
            username:'',
            email:'',
            password:'',
            password2:''
          })
          
        } catch (err) {
          console.error('Failed to create user: ', err)
          console.log(error?.data)
        }
      }
  }

  // when the user successfully signup redirect to your info page
  useEffect(() => { 
    if(isSuccess) {
      dispatch(login(user.data))
      navigate(`/admin/${user.data.username}/your-information`, {replace:true})
      toast.success(user.message)
    }  
   
  }, [isSuccess, navigate])

  // if a user is already login they can come to the signup page
  useEffect(() => {
     if(token){
      navigate(`/admin/${loginUser.username}`, {replace:true})
     }
  }, [token, loginUser])

  return (
    <div className="auth-container">
      <Form className="auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <Link to={"/login"} className="link-primary">
              Sign In
            </Link>
             {isError && (     
              <Alert variant="danger">{error?.data?.detail[0]}</Alert>
              )}
          </div>
          {isLoading && (
            <Spinner animation="border" variant="dark" role="status"/>
          )}
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text" 
              className="mt-1" 
              name="username"
              value={username}
              placeholder="e.g JaneDoe2020"
              onChange={handleOnChange}/>
              {error?.data?.username && <span className="mt text-danger">{error.data.username[0]}</span>}
          </Form.Group>
          <Form.Group controlId="email" className="mt-2">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              className="mt-1"
              name="email" 
              value={email}
              placeholder="e.g janedoe@website.com"
              onChange={handleOnChange}/>
              {error?.data?.email && <span className="mt-1 text-danger">{error.data.email[0]}</span>}
          </Form.Group>
          <Form.Group controlId="password" className="mt-2">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              className="mt-1"
              name="password" 
              value={password}
              placeholder="xxxxxxxxx"
              onChange={handleOnChange}/>
              {error?.data?.error && <span className="mt-1 text-danger">{error.data.error[0]}</span>}
          </Form.Group>
          <Form.Group controlId="confirm_password" className="mt-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type="password" 
              className="mt-1" 
              placeholder="xxxxxxxxx"
              name="password2"
              value={password2}
              onChange={handleOnChange}/>
          </Form.Group>
          
          
          <div className="d-grid gap-2 mt-3">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </Form>
    </div>
  )
}

export default Signup