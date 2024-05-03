'use client';
import Image from 'next/image';
import { Group } from '@mantine/core';

import classes from './AdminSidebar.module.css';
import logo from '@/assets/logo/logo-footer.svg';
import { links } from './lib/utils';
import { Menu } from './components/Menu';

export default function AdminSidebar() {
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify='center'>
          <Image
            src={logo.src}
            priority
            width={147}
            height={26}
            alt='Happy Tails'
          />
        </Group>
        <Menu links={links} />
      </div>
    </nav>
  );
}
