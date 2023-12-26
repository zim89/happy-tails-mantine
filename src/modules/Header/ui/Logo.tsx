import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoMobileImg from '@/assets/logo/logo-mobile.svg';
import logoTabletImg from '@/assets/logo/logo-tablet.svg';
import logoDesktopImg from '@/assets/logo/logo-desktop.svg';

function Logo() {
  return (
    <Link href='/'>
      <Image
        src={logoMobileImg}
        alt='Logo image'
        width={42}
        height={42}
        className='md:hidden'
      />
      <Image
        src={logoTabletImg}
        alt='Logo image'
        height={42}
        width={237}
        className='hidden md:block lg:hidden'
      />
      <Image
        src={logoDesktopImg}
        alt='Logo image'
        height={52}
        width={282}
        className='hidden lg:block'
      />
    </Link>
  );
}

export default Logo;
