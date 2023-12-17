import React, {useState} from 'react'
import { Modal, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const UploadImageModal = ({show, handleClose, handleUpload}) => {
    const [profileImg, setProfileImg]=useState(null)

    
    const handleFileOnChange=(event)=>{
                setProfileImg(event.target.files[0])
    }
  return (
    <Modal show={show} onHide={handleClose}>
        <div>
            <Modal.Body className='file-card'>
            <div className="file-inputs mt-2">
                    <input type="file" name='file'  onChange={handleFileOnChange}/>
                    <div className='file-btn'>            
                        <FontAwesomeIcon icon={faUpload} color='#202040' size='40'/>           
                    </div>
            </div>

                <p className="main">Chose a file to upload</p>
                <p className="info">JPG, PNG</p>      
                <div className='mt-2 mb-1'>
                    <button type='submit' onClick={()=>handleUpload(profileImg)} className='btn btn-outline-primary'>Save</button>
                </div>
                
            </Modal.Body>
        </div>
    </Modal>

    
  )
}

export default UploadImageModal