import React from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";
import brandImg from "../../assets/tree.svg"

const Banner = () => {
  return (
    <div className='bg-banner'>
        <Container>
            <Row>
                <Col sm={7}>
                    <div className='d-flex align-items-center justify-content-center h-100'>
                        <div className='text-white p-4'>
                            <h1 className='text-white  mb-4 heading-1'>Everything you are<span> In one place</span></h1>
                            <p>One link to help you share everything you create, 
                                curate and sell from your Instagram, 
                                TikTok, Twitter, YouTube and other social media profiles.</p>
                                <Button variant='light' className='px-4 font-weight-bold w-50'>Get Started</Button>
                        </div>
                   </div>
                </Col>
                <Col>
                   <div>
                    <img src={brandImg} alt="" className="img-fluid" />
                   </div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Banner