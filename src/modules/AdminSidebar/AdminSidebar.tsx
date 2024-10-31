'use client';

import Image from 'next/image';
import { Group } from '@mantine/core';

import classes from './AdminSidebar.module.css';
import { links } from './lib/utils';
import { Menu } from './components/Menu';
import Logo from '@/components/Logo';

export default function AdminSidebar() {
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group classNames={{ root: classes.logo }}>
          <Image
            src='/logo/logo-footer.svg'
            priority
            width={147}
            height={26}
            className='hidden md:block'
            alt='Happy Tails Logo'
          />
          <div className='saturate contrast-[2] grayscale filter md:hidden'>
            <Logo />
          </div>
        </Group>
        <Menu links={links} />
      </div>
    </nav>
  );
}
