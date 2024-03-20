import { Metadata } from 'next';
import { Container } from '@mantine/core';

import SliderMenu from '@/modules/ProfileMenu/mobile';
import SidebarMenu from '@/modules/ProfileMenu/laptop';

import classes from './layout.module.css';

export const metadata: Metadata = {
  title: 'Happy Tails | Profile Page',
  description: null,
  robots: {
    index: false,
  },
};

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Container className={classes.pageContent}>
      {/* Only on mobiles and tablets */}
      <SliderMenu />

      {/* From laptops and beyond */}
      <SidebarMenu />

      <div className='lg:px-8 px-3 py-10 lg:mt-0'>{children}</div>
    </Container>
  );
}
