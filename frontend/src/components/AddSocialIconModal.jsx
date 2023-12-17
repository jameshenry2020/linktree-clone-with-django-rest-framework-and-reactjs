import React, {useState, useEffect} from 'react'
import { Modal, Form, Button } from "react-bootstrap";
// import data from "../assets/data.json"
import { useGetMediaIconQuery, useAddSocialIconMutation } from "../features/user/apiUserSlice";

const AddSocialIconModal = ({show, handleClose}) => {
    const {data, isFetching}=useGetMediaIconQuery()
    const [searchValue, setSearchValue]=useState('')
    const [iconValue, setIconValue]=useState(null)
    const [social_acct, setSocialAcct]=useState('')
    const [addSocialIcon, {isSuccess, isError, error}]=useAddSocialIconMutation()
       
      const input={
        'social_media':iconValue,
        'social_accounts':social_acct}
    const handleSubmit= async (e)=>{
          e.preventDefault()
          if (iconValue && social_acct) {
            try {
                await addSocialIcon(input)
            } catch (err) {
                if (isError) {
                    console.log(error)
                }
                console.log('an error occured', err)
                
            }
          }
          
    }
    useEffect(() => {
        if (isSuccess) {
            setIconValue(null)
            setSocialAcct('')
            handleClose()
        }
         
      }, [isSuccess])
   
  return (
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Add Social Link</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='mt-1' style={{marginBottom:'50px'}}>
                    <input type="text" value={searchValue} onChange={(e)=> setSearchValue(e.target.value)} placeholder='Search social icons' className='form-control' />
                    <div className='auto-search-area border'>
                        {data?.filter(item => {
                            let searchTerm=searchValue.toLowerCase();
                            let iconName=item.name.toLowerCase();
                            return searchTerm && iconName.startsWith(searchTerm) && iconName !== searchTerm;
                        })
                        .map((item)=>(
                            <div className='text-center mb-1' onClick={
                                ()=> {
                                    setSearchValue(item.name)
                                    setIconValue(item.id)
                                }
                            } style={{cursor:'pointer'}}>
                                {item.name}
                                </div>
                        ))}
                    </div>
                </div>
                <div className='mb-3'>
                    <input type="text" placeholder='Enter your url' value={social_acct} onChange={(e)=> setSocialAcct(e.target.value)}  className='form-control'/>
                </div>
                <div className='d-flex justify-content-end'>
                    <Button variant='primary' type='submit'>Add</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>

    
  )
}

export default AddSocialIconModal