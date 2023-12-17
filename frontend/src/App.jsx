import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { ActivateEmail, Dashboard, Home,Login,PasswordResetRequest,ProfileTree,Signup, UserData, UserProfile } from "./pages";
import { Layout, ProtectRoute } from './components';
import ResetPassword from './pages/ResetPassword';

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='signup' element={<Signup/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='password-reset' element={<PasswordResetRequest/>}/>
          <Route path='/password-reset-confirm/:uid/:token' element={<ResetPassword/>}/>
          <Route path="activate" element={<ActivateEmail/>}/>     
          <Route path='admin/:username' element={<ProtectRoute/>}>
              <Route index element={<Dashboard/>}/>
              <Route path='your-information' element={<UserData/>}/>
              <Route path='profile' element={<UserProfile/>}/>
          </Route>       
      </Route>
      <Route path=':username' element={<ProfileTree/>}/>

     </Routes>
     
    </>
  )
}

export default App
