import React from 'react'
import { Layout } from '../components/Layout'
import {BiMailSend,BiPhoneCall,BiSupport} from "react-icons/bi"

export const Contact = () => {
  return (
    <Layout title={"Cantact US"}>
      <div className='row contactus'>
        <div className='col-md-6'>
          <img
          src='/images/contactus.jpeg'
          alt='contactus'
          style={{width: "100%"}}
          />
        </div>
        <div className='col-md-4 pt-5'>
          <h1 className='bg-primary p-2  text-white text-center rounded'>CONTACT US</h1>
          <p className='text-justify mt-2'> For any inquiry about product feel free to call as anytime 24/7</p>
          <p className='mt-3'> <BiMailSend/> : www.help@ecommerce.ca </p>
          <p className='mt-3'> <BiPhoneCall/> : 514 123 4567 </p>
          <p className='mt-3'> <BiSupport/> : 1800 -1234-5678 (toll free)</p>
        </div>
      </div>
    </Layout>
  )
}
