import React, {useState, useEffect} from 'react'
import { FirstInfo, SecondInfo,LastInfo } from "../components";
import { Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import { useAddProfileInfoMutation } from "../features/auth/apiAuthSlice";

const MultiStepForm = () => {
  const navigate=useNavigate()
  const loginUser=JSON.parse(localStorage.getItem('user', null))
    let pageMax=2
    const [isSubmitted, setIsSubmitted]=useState(false)
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        names: "",
        occupation:"",
        bio: "",
        phone: "",
        gender: "Male",
        niche: null, //integer id of the niche  
      });
      const [addProfileInfo, {isLoading, isSuccess, isError, error}]=useAddProfileInfoMutation()

      const prevButton = () => {
        if (page > 0) {
          setPage(currPage => currPage - 1);
        }
      }
    
      const nextButton = () => {
        if (page !== pageMax) {
          setPage(prevPage => prevPage + 1);
        } else {
          //final submit
          // handleSubmit()
          setIsSubmitted(true);
        }
      }
      const {names, occupation, bio, phone, gender, niche}=formData
      const canUpload = [names, occupation, bio, phone, gender, niche].every(Boolean) && !isLoading
      const handleSubmit= async(e)=>{
        e.preventDefault();
        if (canUpload) {
          try {
            await addProfileInfo(formData).unwrap()
            setFormData({
              names: "",
              occupation:"",
              bio: "",
              phone: "",
              gender: "Male",
              niche: null, //integer id of the niche  
            })

          } catch (err) {
             console.log("failed to upload profile info", err)
          }
          
        }

      }

      // useEffect(() => {
      //   if (condition) {
          
      //   }
      
        
      // }, [third])
      

      useEffect(() => {
        if (isSuccess) {
          navigate(`/admin/${loginUser.username}`, {replace:true})
          toast.success("info uploaded successfully")
        } 
      }, [isSuccess, navigate])
      
      const PageDisplay = () => {
        if (page === 0) {
          return <FirstInfo formData={formData} setFormData={setFormData} />;
        } else if (page === 1) {
          return <SecondInfo formData={formData} setFormData={setFormData} />;
        } else {
          return <LastInfo formData={formData} setFormData={setFormData} />;
        }
      };

  return (
    <Form onSubmit={handleSubmit}>
         {isLoading && (
          <Spinner animation='border' variant='dark'/>
         )}
        <div style={{margin: '20px 30px'}}>
            {PageDisplay()}
        </div>
        <div className='px-4 w-100'>
            {page > 0 && (
                <button className=' btn btn-primary mx-1'>Back</button>
            )}
            {page === pageMax ? (<button type='submit' className='btn btn-primary mr-1'>Save</button>) : (<button className='ml-1 btn btn-primary' onClick={nextButton}>continue</button>)}
        </div>
    </Form>
  )
}

export default MultiStepForm