import React from 'react'
import { Container, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <div>

    <footer style={{background:'##37517e', fontSize:'14px'}}>
    <div className="footer-top">
      <Container>
        <Row>
          <div className="col-lg-3 col-md-6 footer-contact">
                <h3>LinkHouse</h3>
               <p> A108 Adam Street <br/>
                New York, NY 535022<br/>
                United States <br/>
                <strong>Phone:</strong> +1 5589 55488 55<br/>
                <strong>Email:</strong> info@example.com<br/> </p>
          </div>

          <div className="col-lg-3 col-md-6 footer-links">
            <h4 className=''>Useful Links</h4>
            <ul>
              <li> <a href="#">Home</a></li>
              <li> <a href="#">About us</a></li>
              <li> <a href="#">Services</a></li>
              <li> <a href="#">Terms of service</a></li>
              <li> <a href="#">Privacy policy</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 footer-links">
            <h4 className=''>Our Services</h4>
            <ul>
              <li> <a href="#">Web Design</a></li>
              <li> <a href="#">Web Development</a></li>
              <li> <a href="#">Product Management</a></li>
              <li> <a href="#">Marketing</a></li>
              <li> <a href="#">Graphic Design</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 footer-links">
            <h4>Our Social Networks</h4>
            <p>Cras fermentum odio eu feugiat lide par naso tierra videa magna derita valies</p>
            <div className="social-links mt-3">
              <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
              <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
              <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
              <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
              <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
            </div>
          </div>
        </Row>
        </Container>
    </div>
    <div className="container footer-bottom">
      <div className="copyright">
        &copy; Copyright <strong><span className='px-2'>LinkHouse</span></strong>. All Rights Reserved
      </div>
      
    </div>
  </footer>
    </div>
  )
}

export default Footer