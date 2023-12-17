import React from 'react'
import { Container, Stack, Button, Card} from "react-bootstrap";
import bimage from "../../assets/wall.svg"
const InfoSection = () => {
  return (
    <Container>
      <div className='info-layout row py-5'> 
            <div className='col-md-5 mr-2'>
                <h2 className='heading-2'>join more than 2000 amazing people using link house</h2>
                <p className='p-2 paragraph-1 mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Tempora dolores voluptatibus recusandae amet voluptatum 
                    eum nisi consectetur vel doloribus accusantium
                    recusandae amet voluptatum 
                    eum nisi consectetur vel doloribus accusantium.
                    recusandae amet voluptatum 
                    eum nisi consectetur vel doloribus accusantium
                    recusandae amet voluptatum 
                    eum nisi consectetur vel doloribus accusantium.
                </p>
                <Button variant='outline-danger'>Learn more</Button>
            </div>
            <div className='col-md-7 p-5'>
                <img src={bimage} alt="" style={{width:'90%'}} className='img-fluid' />
            </div>
      </div>
    </Container>
  )
}

export default InfoSection