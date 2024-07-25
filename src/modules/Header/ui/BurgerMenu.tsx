'use client';
import { useEffect } from 'react';
import { UnstyledButton, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AlignLeft, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { useDeviceSize } from '@/shared/lib/hooks';
import MenuNavbar from './MenuNavbar';
import { Category } from '@/shared/types/types';

export default function BurgerMenu({ categories }: { categories: Category[] }) {
  const [opened, { close, toggle }] = useDisclosure(false);
  const { isDesktop } = useDeviceSize();
  const path = usePathname();

  useEffect(() => {
    close();
  }, [close, path]);

  return (
    <>
      <UnstyledButton
        className='group flex items-center justify-center gap-3'
        aria-label='Burger menu'
        onClick={toggle}
      >
        {opened ? <X className='iconBtn' /> : <AlignLeft className='iconBtn' />}
        <p className='hidden md:inline-block md:text-lg'>Menu</p>
      </UnstyledButton>

      <Drawer
        opened={opened}
        onClose={close}
        withCloseButton={false}
        position={isDesktop ? 'top' : 'left'}
        overlayProps={{
          backgroundOpacity: isDesktop ? 0 : 0.5,
          top: isDesktop ? 84 : 0,
        }}
        transitionProps={{
          duration: isDesktop ? 300 : 150,
          timingFunction: 'linear',
        }}
        classNames={{
          body: 'p-0 pb-8 lg:bg-brand-grey-100 lg:px-14 lg:py-8',
          inner:
            'w-[368px] overflow-hidden md:w-[495px] lg:top-[84px] lg:h-[198px] lg:w-full',
        }}
      >
        {/*  Header */}
        <div className='mb-4 flex items-center justify-between border-b border-b-brand-grey-300 bg-brand-grey-100 px-4 py-4 pb-[15px] md:px-9 lg:hidden'>
          <Image
            src='/logo/logo-tablet.svg'
            alt='Logo image'
            height={42}
            width={237}
          />
          <UnstyledButton
            className='flex items-center justify-center'
            onClick={close}
          >
            <X className='btnIcon' />
          </UnstyledButton>
        </div>

        {/*  Navbar */}
        <MenuNavbar menu={categories} path={path} />
      </Drawer>
    </>
  );
}
