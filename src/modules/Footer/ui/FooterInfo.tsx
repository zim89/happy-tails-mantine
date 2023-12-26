import React from 'react'
import logo from '@/assets/logo/logo-footer.svg';
import Image from 'next/image';
import { Box, Text } from '@mantine/core';


export default function FooterInfo () {
  return (
    <div className='w-full flex lg:flex-row lg:justify-between sm:flex-col sm:items-start sm:gap-6 lg:gap-0'>
        <Image src={logo} alt="logo" className='h-[48px] '/>
        <div className='flex flex-col gap-2 lg:w-[466px] sm:w-full'>
          <p className='font-bold text-white font-lato lg:text-xl sm:text-base'>CONTACT US</p>
          <p className='font-lato font-normal text-lg text-white'>We value your queries and feedback. If you have any further questions or need assistance, please feel free to reach out to us. Don't hesitate to get in touch with us,  we'll be glad to assist you!</p>
          <a href="mailto:onlinestore.teamch2023@gmail.com" className='font-lato font-normal text-lg text-white hover:underline'>onlinestore.teamch2023@gmail.com</a>
        </div>
    </div>
  )
}
