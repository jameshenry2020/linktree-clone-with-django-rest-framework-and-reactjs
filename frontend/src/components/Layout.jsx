import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import { Container} from "react-bootstrap";
import { useSelector, useDispatch} from "react-redux";
import { isAuthenticated } from "../features/auth/userSlice";
import { Footer, Header } from "./";
import { logout } from "../features/auth/userSlice";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const isLogin=useSelector(isAuthenticated)

  const handleLogout = ()=>{
    dispatch(logout())
    navigate('/login', {replace:true})
  }
  return (
    <div>
        <Header isLogin={isLogin} handleLogout={handleLogout}/>
        <div>
          <ToastContainer />
        </div>
        <Outlet/>
        <Footer/>    
    </div>
  )
}

export default Layout