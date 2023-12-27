import React from 'react'
import logo from '@/assets/logo/logo-footer.svg';
import Image from 'next/image';

export default function FooterInfo () {
  return (
    <div className='w-full flex flex-col items-start gap-6 lg:flex-row lg:justify-between lg:gap-0'>
        <Image src={logo} alt="logo" className='h-12'/>
        <div className='w-full flex flex-col gap-2 lg:w-[466px]'>
          <p className='text-base uppercase font-bold text-primary lg:text-xl lg:leading-6'>contact us</p>
          <p className='text-primary text-xs leading-[18px] lg:text-base'>We value your queries and feedback. If you have any further questions or need assistance, please feel free to reach out to us. Don't hesitate to get in touch with us,  we'll be glad to assist you!</p>
          <a href="mailto:onlinestore.teamch2023@gmail.com" className=' text-primary relative text-xs after:absolute after:-bottom-[1px] after:left-0 after:block after:h-[1px] after:w-64 after:scale-0 after:bg-primary after:transition-transform after:duration-300 after:hover:scale-100 leading-[18px] lg:text-base'>onlinestore.teamch2023@gmail.com</a>
        </div>
    </div>
  )
}
