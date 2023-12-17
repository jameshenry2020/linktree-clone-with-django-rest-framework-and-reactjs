import React, {useState, useEffect} from 'react'
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux"


const Header = ({isLogin, handleLogout}) => {
  const user= useSelector(state => state.auth.user)
   
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">LinkHouse</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
        <Nav className="me-auto ">
          
           {isLogin ? (
               <>
              <Nav.Link href="#home" className='px-4 font-weight-bold text-dark'>Links</Nav.Link>
              <Nav.Link href="#link" className='px-4 font-weight-bold text-dark'>Preview Links</Nav.Link>
              </>
           ) : (
            <>
            <Nav.Link href="#home" className='px-4 font-weight-bold text-dark'>Learn</Nav.Link>
            <Nav.Link href="#link" className='px-4 font-weight-bold text-dark'>MarketPlace</Nav.Link>  
            </>
            )}
            
            
          </Nav>
          <Nav className="ml-auto d-flex align-items-baseline">
          {isLogin ? (
               <>
                <Nav.Link href={`/admin/${user.username}`}className='px-2 font-weight-bold text-dark'>Admin</Nav.Link>
               <button className='px-2 btn btn-outline-danger mx-2 text-dark' onClick={handleLogout}>Logout</button>
                <Nav.Link href={`${user.username}/profile` }className='px-2'>
                  <div className='mx-1 d-flex align-items-center justify-content-center' style={{width: '40px', height:'40px', borderRadius:'30px', background:'#d6401e', textAlign:'center', cursor:'pointer'}}>AH</div>
                </Nav.Link>
             
              </>
           ) : (
            <>
            <Nav.Link href="/login" className='px-4 font-weight-bold'>Login</Nav.Link>
            <Nav.Link href="signup" className='btn btn-primary text-white px-4 font-weight-bold'>Sign up for free</Nav.Link>
              
            </>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default Header