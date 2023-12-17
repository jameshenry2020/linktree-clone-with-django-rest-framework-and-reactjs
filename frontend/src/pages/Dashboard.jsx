import React, {useState} from 'react'
import { Container, Col, Row, Spinner } from "react-bootstrap";
import { AddLinkModal, LinkDetailCard } from '../components';
import { useGetLinksQuery } from "../features/user/apiUserSlice";
import { useParams } from "react-router-dom";


// const dummy_data=[
//   { 
//     id:1,
//     link_name:'linkedin account',
//     link:'https://www.linkedin.com/henry'
//   },
//   { 
//     id:2,
//     link_name:'henry coding channel',
//     link:'https://www.youtube.com/henrycodingstack'
//   },
//   { 
//     id:3,
//     link_name:'Online course',
//     link:'https://www.udemy.com/henrycodingstack'
//   },
// ]
const Dashboard = () => {
  const [showAddlinkModal, setShowAddLinkModal]=useState(false)
  // const [links, setLinks]=useState([])
  const { username }=useParams()
  const {data:links, isFetching}=useGetLinksQuery(username)
  // const editLink = (id) => {
  //   setLinks(
  //     dummy_data.map((link) =>
  //       link.id === id ? { ...link} : null
  //     )
  //   );
  // }
  return (
    <>
    <Container>
       <Row>
          <Col>
             <div className='section-container-1'>
                { isFetching && (
                  <Spinner animation='border' variant='dark'/>
                )}
               <div className='w-25 mx-auto'>
                     <button className='custom-btn' onClick={()=> setShowAddLinkModal(true)}><span>+</span> Add Link</button>
               </div>
                <div className='w-50 my-5 mx-auto'>
                  {links ? (
                    <>
                        {links.map(item=> (
                          <LinkDetailCard key={item.id}   linkDetail={item}/>
                        ))}
                    </>
                  ): (
                      <p className='text-mute my-2 text-center'>you have no links yet</p>
                  )}
                                             
                </div>
             </div>
          </Col>
       </Row>
       
    </Container>
    <AddLinkModal show={showAddlinkModal} handleClose={()=>setShowAddLinkModal(false)} />
    </>
  )
}

export default Dashboard