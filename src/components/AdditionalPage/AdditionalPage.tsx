import React from 'react'
import dog from '@/assets/images/dog.svg'
import Image from 'next/image'

export default function AdditionalPage() {
  return (
    <div className='p-5 flex flex-col items-center bg-primary lg:flex-row lg:justify-center'>
       <Image src={dog} alt='dog' className='object-cover'/>
       <div className="flex flex-col items-center w-[751px] lg:items-end">
          <p className='text-[50px] leading-[70px] text-secondary font-bold flex flex-col items-center lg:items-end lg:text-[80px] lg:leading-[96px] '>Website is
             <span className='text-[68px] leading-[70px] text-[#F39324] flex flex-col items-center lg:leading-[105px] lg:items-end lg:flex-row lg:text-[88px] gap-3'> under <span> construction </span> </span>
          </p>
          <p className='text-base text-secondary flex flex-col w-[373px] py-3'>Thank you for visiting this page and showing interest in our project. We are thrilled about what's to come, and we can't wait to share our progress with you! <span className='text-[#F39324]'>Please check back soon.</span></p>
       </div>
    </div>
  )
}