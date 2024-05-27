'use client';

import Image from 'next/image';
import { Group } from '@mantine/core';

import classes from './AdminSidebar.module.css';
import logo from '@/assets/logo/logo-footer.svg';
import { links } from './lib/utils';
import { Menu } from './components/Menu';
import Logo from '@/components/Logo';

export default function AdminSidebar() {
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group styles={{ root: { padding: "2em 0px 3em 0px" } }} justify="center">
          <Image
            src={logo.src}
            priority
            width={147}
            height={26}
            className="hidden md:block"
            alt='Happy Tails Logo'
          />
          <div className="md:hidden filter grayscale contrast-[2] saturate">
            <Logo />
          </div>
        </Group>
        <Menu links={links} />
      </div>
    </nav>
  );
}
