import React from 'react'
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";


const ProtectRoute = () => {
  //check if a token exist, then redirect the user to the login page 
 const authState=useSelector( state => state.auth)
const {isAuthenticated, access_token}=authState
const token=JSON.parse(localStorage.getItem('access_token'))
console.log(isAuthenticated)
  return (
    <div>
      {isAuthenticated && token ? (
        <Outlet/>
      ) : (
          <Navigate to={"/login"} replace/> 
      )}
      
    </div>
  )
}

export default ProtectRoute