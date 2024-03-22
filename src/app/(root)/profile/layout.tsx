"use client";
import { Container } from '@mantine/core';

import SliderMenu from '@/modules/ProfileMenu/mobile';
import SidebarMenu from '@/modules/ProfileMenu/laptop';

import classes from './styles.module.css';
import { useAuth } from '@/shared/hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { isAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) router.push("/");
  }, [isAuth, router]);

  if (!isAuth) return null;

  return (
    <Container className={classes.page}>
      {/* Only on mobiles and tablets */}
      <SliderMenu />
      {/* From laptops and beyond */}
      <SidebarMenu />
      <div className={classes.content}>{children}</div>
    </Container>
  );
}
