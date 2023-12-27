import React from 'react'
import FooterInfo from './ui/FooterInfo';
import FooterLinks from './ui/FooterLinks';
import FooterCreators from './ui/FooterCreators';

export default function Footer() {
  return (
    <footer className='flex flex-col relative items-start bg-secondary py-6 px-4 gap-6  md:p-8 md:gap-[36px] lg:py-9 lg:px-14'>
         <FooterInfo/>
         <FooterLinks/>
         <FooterCreators/>
    </footer>
  )
}
