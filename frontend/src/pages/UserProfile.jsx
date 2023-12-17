import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { Col, Container,Row, Card, Button, Form} from "react-bootstrap";
import profileImg from "../assets/profile.png"
import { AddSocialIconModal, SocialIcon, UploadImageModal } from '../components';
import {faTable } from '@fortawesome/free-solid-svg-icons';
import { useGetProfileQuery, useUploadPhotoMutation, useGetSocialIconsQuery} from "../features/user/apiUserSlice";

const UserProfile = () => {
    const {username}=useParams()
    const [showUploadModal, setShowUploadModal]=useState(false)
    const [showIconModal, setShowIconModal]=useState(false)
    const [uploadPhoto, {isLoading:Loading, isError}]=useUploadPhotoMutation()
    const handleUpload=async (img)=>{

        const formdata=new FormData()
        if (img) {
             console.log(img)
             formdata.append('profile_img', img)
             await uploadPhoto(formdata).unwrap()
             setShowUploadModal(false)
    
             
        }
   }
    const [userProfile, setUserProfile]=useState({
        names:'',
        occupation:'',
        phone:'',
        bio:'',
        profile_img:''

    })

    const {
        data: profile,
        isFetching,
        isSuccess,
        isLoading,
      } = useGetProfileQuery(username, {
        refetchOnMountOrArgChange: true,
        skip: false,})

       useEffect(() => {
         if (!isLoading && isSuccess) {
              setUserProfile({
                names:profile.names,
                occupation:profile.occupation,
                phone:profile.phone,
                bio:profile.bio,
                profile_img:profile.profile_img
              })
         }
       
         
       }, [isSuccess])
       const {data:social_links, isSuccess:isSocialSuccess, isFetching:isSocialFetching}=useGetSocialIconsQuery(username, {
        refetchOnMountOrArgChange: true,
       })
       const handleOnChange =(e)=>{
             setUserProfile( prev => ({
                ...prev,
                [e.target.name]:e.target.value
             }))
       }
       
      const {names, occupation, phone, bio, profile_img}=userProfile
  return (

    <>
    <Container style={{background: 'rgba(0, 0, 0, 0.1)', height:'100vh'}}>
        <Row>
         <Col>
            <h2>Profile</h2>
            <Card>
                <Card.Body>
                    <div className='d-flex align-items-baseline justify-content-around'>
                        <div className='profile_img'>
                            <img src={`http://localhost:8000${profile_img}`} alt=""  className='w-100 h-100' style={{objectFit:'cover', borderRadius:'50%'}}/>
                        </div>
                        <div>
                            <button className='custom-btn' onClick={()=>setShowUploadModal(true)}>Pick an Image</button>
                        </div>
                    </div>
                    <div>
                        <Form>
                            <Form.Group controlId='name' className='mb-2' >
                                <Form.Label>Names</Form.Label>
                                <Form.Control type='text' value={names}  onChange={handleOnChange}/>
                            </Form.Group>
                            <Form.Group controlId='occupation' className='mb-2'>
                                <Form.Label>Occupation</Form.Label>
                                <Form.Control type='text' value={occupation} onChange={handleOnChange} />
                            </Form.Group>
                            <Form.Group controlId='phone' className='mb-2'>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type='text' value={phone}  onChange={handleOnChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="bio">
                                <Form.Label>Bio</Form.Label>
                                <Form.Control as="textarea" rows={3} value={bio} onChange={handleOnChange}/>
                            </Form.Group>
                            <div className='w-100 px-4 mb-2'>
                                <Button className='w-100' variant='primary'>Submit</Button>
                            </div>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
         </Col>
         <Col className='pt-5'>
           <Card>
            <Card.Body>
                <button className='btn btn-outline-primary w-50 mb-2' onClick={()=> setShowIconModal(true)}>+ Add Social Icon</button>
                <p className='paragraph-1'>add icon linking to your social profiles </p>
                <div className='px-2'>
                    {isSocialSuccess && !isSocialFetching && (
                        social_links.map((s_link)=> (
                           <SocialIcon key={s_link.id} id={s_link.id} text={s_link.social_media.name} icon={s_link.social_media.icon} social_url={s_link.social_accounts}/> 
                        ))
                    )}
                    
                    
                </div>
            </Card.Body>
           </Card>
         </Col>
        </Row>
    </Container>
     <AddSocialIconModal show={showIconModal} handleClose={()=> setShowIconModal(false)}/>
     <UploadImageModal show={showUploadModal} handleClose={()=>setShowUploadModal(false)} handleUpload={handleUpload}/>
    </>
  )
}

export default UserProfile