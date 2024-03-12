import { Metadata } from 'next';
import { Container } from '@mantine/core';

import SliderMenu from './ui/SliderMenu';
import SidebarMenu from './ui/SidebarMenu';
import { cn } from '@/shared/lib/utils';

import classes from "./page.module.css";

export const metadata: Metadata = {
  title: 'Happy Tails | Profile Page',
  description: null,
  robots: {
    index: false,
  },
};

type Props = {
  children: React.ReactNode
}
export default function Page({ children }: Props) {
  return (
    <>
      {/* Only on mobiles and tablets */}
      <SliderMenu />

      <Container className={cn('mt-12 lg:mt-0', classes.pageContent)}>
        {/* From laptops and beyond */}
        <SidebarMenu />
        
        <div className="max-w-full mx-auto">
          {children}
        </div>
      </Container>
    </>
  );
}
