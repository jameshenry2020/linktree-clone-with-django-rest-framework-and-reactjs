import React from 'react'
import { Form, Spinner } from "react-bootstrap";
import { useGetNichesQuery } from "../../features/auth/apiAuthSlice";

const LastInfo = ({formData, setFormData}) => {
  const {
    data: niches,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNichesQuery()

    const onOptionChange = e => {
        setFormData({...formData, gender:e.target.value})
      }
      const handleChange = e => {
        console.log(e.target.value);
        setFormData({...formData, niche:e.target.value});
      };

      let content

      if (isLoading) {
        content = <Spinner animation="border" variant="dark"/>
      } else if (isSuccess) {
        content = niches.map(niche => (<option key={niche.id} value={niche.id}>{niche.name}</option>))
      } else if (isError) {
        content = <option>{error.toString()}</option>
      }
  return (
    <div>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Phone</Form.Label>
        <Form.Control 
            type="text" 
            placeholder="Enter Phone" 
            value={formData.phone}
            onChange={(e)=> setFormData({...formData, phone:e.target.value})} />
      </Form.Group>
      <Form.Group>
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="Male"
            name="gender"
            value="Male"
            checked={formData.gender === "Male"}
            onChange={onOptionChange}
            type={type}
            id={`inline-${type}-1`}
          />
          <Form.Check
            inline
            label="FeMale"
            name="gender"
            value="Female"
            checked={formData.gender === "Female"}
            onChange={onOptionChange}
            type={type}
            id={`inline-${type}-2`}
          />
          </div>))}
          <Form.Group>
          <Form.Label>What your Business Niche</Form.Label>
            <Form.Select aria-label="Default select example" name='niche' onChange={handleChange}>
                {content}
            </Form.Select>

          </Form.Group>
     

        
      </Form.Group>
    </div>
  )
}

export default LastInfo