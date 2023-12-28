import React from 'react';
import { Image } from '@mantine/core';
import Link from 'next/link';

function Logo() {
  return (
    <Link href='/'>
      <Image
        src='/logo/logo-mobile.svg'
        alt='Logo image'
        w={42}
        h={42}
        className='md:hidden'
      />
      <Image
        src='/logo/logo-tablet.svg'
        alt='Logo image'
        h={42}
        w={237}
        className='hidden md:block lg:hidden'
      />
      <Image
        src='/logo/logo-desktop.svg'
        alt='Logo image'
        h={52}
        w={282}
        className='hidden lg:block'
      />
    </Link>
  );
}

export default Logo;
