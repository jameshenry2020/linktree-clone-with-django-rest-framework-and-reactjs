import React from 'react'
import { Banner, InfoSection, TestimonialSlider } from "../components";

const Home = () => {
  return (
    <>
      <Banner/>
      <InfoSection/>
      <div className='w-100 container'>
        <div className='mb-4 px-5'>
          <h1 className='heading-1'>What they saying</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint numquam commodi sit soluta. Ratione, porro!</p>
        </div>
        <TestimonialSlider/>
      </div>
      
    </>
  )
}

export default Home