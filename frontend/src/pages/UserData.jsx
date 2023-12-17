import React from 'react'
import { Container, Row, Col, Card } from "react-bootstrap";
import { MultiStepForm } from "../components";
import BrandNote from "../assets/note.svg"
const UserData = () => {
  return (
    <div>
        <Container>
            <Row>
                <Col>
                 <div className='section-container'>
                   <div className='w-100'>
                    <h1 className='heading-3'>Tell Us About Yourself</h1>
                    <p>for a personalize link house experience</p>
                   </div>
                   <Card style={{width:'100%'}}>
                       <Card.Body>
                           <MultiStepForm/>
                       </Card.Body>
                   </Card>
                   </div>
                </Col>
                <Col>
                    <div>
                        <img src={BrandNote} alt="" className='img-fluid' />
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default UserData