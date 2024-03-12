import { Metadata } from 'next';
import { Container } from '@mantine/core';

import SliderMenu from '@/modules/ProfileMenu/mobile';
import SidebarMenu from '@/modules/ProfileMenu/laptop';
import { cn } from '@/shared/lib/utils';

import classes from "./page.module.css";

export const metadata: Metadata = {
  title: 'Happy Tails | Profile Page',
  description: null,
  robots: {
    index: false,
  },
};

export default function Page() {
  return (
    <>
      {/* Only on mobiles and tablets */}
      <SliderMenu />

      <Container className={cn('mt-12 lg:mt-0', classes.pageContent)}>
        {/* From laptops and beyond */}
        <SidebarMenu />
        
        <div className="max-w-full mx-auto">
          Profile page
        </div>
      </Container>
    </>
  );
}
