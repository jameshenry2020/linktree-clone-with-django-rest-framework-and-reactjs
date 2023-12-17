import React, {useEffect} from 'react'
import { useSearchParams, useNavigate } from "react-router-dom";
import { useActivateEmailMutation } from "../features/auth/apiAuthSlice";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/userSlice";

const ActivateEmail = () => {7
    const dispatch=useDispatch()
    const logintoken=JSON.parse(localStorage.getItem('access_token', null)) //to check if the user is already login
  
    const navigate=useNavigate()
    let [searchParams, setSearchParams] = useSearchParams()
    const token = searchParams.get("token")
    const [activateEmail, {isLoading, isSuccess, isError, error}]=useActivateEmailMutation()

    const handleActivate= async ()=>{
            if (token) {
                await activateEmail({ token }) 
                if (isSuccess) {
                    toast.success("Email verified successfully")
                    navigate("/login", {replace: true})
                }else{
                    toast.error(error?.data?.error)
                }     
            }
    }
    useEffect(() => {
      dispatch(logout())
    }, [])
    
  return (
    <div>
        <div className='mt-5 w-100 py-4 flex justify-content-center align-items-center'>
            <div className='mx-auto text-center' style={{width:'60%'}}>
            <p className='font-weight-bold' style={{fontSize:'18px', fontFamily:'sans-serif'}}>click the button below to activate your account </p>
               {isLoading && (
                <Spinner animation="border" variant="dark" role="status"/>
               )}
            <button onClick={handleActivate} className='py-1 px-4 btn btn-primary text-white'>Activate</button> 
            </div>
                 
        </div>
    </div>
  )
}

export default ActivateEmail