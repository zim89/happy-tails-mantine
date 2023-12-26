import React from 'react'
import FooterInfo from './ui/FooterInfo';
import FooterLinks from './ui/FooterLinks';
import FooterCreators from './ui/FooterCreators';

export default function Footer() {
  return (
    <div className='flex flex-col relative items-start bg-[#161616] py-[36px] px-[56px] gap-8 '>
         <FooterInfo/>
         <FooterLinks/>
         <FooterCreators/>
    </div>
  )
}
