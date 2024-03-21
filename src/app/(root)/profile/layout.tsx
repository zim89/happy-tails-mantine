"use client";
import { Container } from '@mantine/core';

import SliderMenu from '@/modules/ProfileMenu/mobile';
import SidebarMenu from '@/modules/ProfileMenu/laptop';

import classes from './styles.module.css';
import { useAuth } from '@/shared/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) router.push("/"); 
  }, [currentUser]);

  if (!currentUser) return null;  

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
