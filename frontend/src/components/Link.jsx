import React from 'react'
import { Card } from "react-bootstrap";

const LinkT = ({name, link, openInNewTab}) => {
  return (
    <Card onClick={()=> openInNewTab(link)} className='d-flex align-self-center mb-2' style={{width:'80%', cursor:'pointer', borderRadius:'10px', height:'70px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
        <Card.Body className='d-flex align-items-center py-0'>
            <div className='border' style={{width: '40px', height:'40px', borderRadius:'10px'}}>
               
            </div>
            <div className='flex-grow-1 text-center'>
               <span className='text-center' style={{fontSize:'20px'}}>{name}</span> 
            </div>
            
        </Card.Body>
    </Card>
  )
}

export default LinkT