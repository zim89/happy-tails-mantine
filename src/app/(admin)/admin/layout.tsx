'use client';
import React, { useState } from 'react';

import classes from './layout.module.css';
import {
  Box,
  Collapse,
  Group,
  UnstyledButton,
  rem,
  Button,
  useCombobox,
  Combobox,
} from '@mantine/core';
import { LayoutList, Minus, LogOut, ChevronLeft } from 'lucide-react';

import logo from '@/assets/logo/logo-footer.svg';
import Link from 'next/link';
import Image from 'next/image';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Link className={classes.link} href={link.link} key={link.label}>
      <Minus className='scale-x-50' />
      <span>{link.label}</span>
    </Link>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className='w-full py-2 pl-14'
        style={
          opened
            ? { backgroundColor: '#F39324' }
            : { backgroundColor: 'transparent' }
        }
      >
        <Group>
          <Box className="flex">
            <Icon style={{ width: rem(22), height: rem(22), color: 'white' }} />
            <Box ml='md' className='text-xl font-bold leading-6 text-white'>
              {label}
            </Box>
          </Box>
        </Group>
      </UnstyledButton>
      {hasLinks ? (
        <Collapse className={opened ? 'mb-8' : 'mb-0'} in={opened}>
          {items}
        </Collapse>
      ) : null}
    </>
  );
}

const data = [
  {
    label: 'Catalog',
    icon: LayoutList,
    initiallyOpened: true,
    links: [
      { label: 'Category', link: '/admin/catalog/category' },
      { label: 'Products', link: '/admin/catalog/products' },
    ],
  },
  {
    label: 'Orders',
    icon: LayoutList,
    links: [{ label: 'Orders', link: '/admin/orders' }],
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const links = data.map((item) => <LinksGroup {...item} key={item.label} />);
  return (
    <div className={classes.layoutWrapper}>
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify='center'>
            <a href='#'>
              <Image
                src={logo.src}
                priority
                width={147}
                height={26}
                alt='Happy Tails'
              />
            </a>
          </Group>
          {links}
        </div>
      </nav>
      <header>
        <Link href='/' className='flex gap-[2px]'>
          <ChevronLeft />
          View your store
        </Link>
        <div className='flex items-center gap-8 lg:gap-[107px]'>
          <div className='hidden gap-2 md:flex'>
            <span className='flex h-6 w-6 items-center justify-center rounded-full bg-[black] text-sm text-white'>
              A
            </span>
            <span>Admin</span>
          </div>
          <Button leftSection={<LogOut size={14} />} variant='default'>
            Log Out
          </Button>
        </div>
      </header>
      <div className='px-6 pt-4'>
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
}
