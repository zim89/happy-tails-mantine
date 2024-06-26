'use client';

import { Container } from '@mantine/core';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import SliderMenu from '@/modules/ProfileMenu/mobile';
import SidebarMenu from '@/modules/ProfileMenu/laptop';

import classes from './styles.module.css';
import { useAuth } from '@/shared/hooks/useAuth';
import { APP_PAGES } from '@/shared/config/pages-url.config';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { isAuth, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) router.push(APP_PAGES.UNAUTHORIZED);
    else if (isAdmin) router.push(APP_PAGES.ADMIN);
  }, [isAuth, isAdmin, router]);

  if (!isAuth) return null;

  return (
    <>
      <Container className={classes.page}>
        {/* Only on mobiles and tablets */}
        <SliderMenu />
        {/* From laptops and beyond */}
        <SidebarMenu />
        <div>{children}</div>
      </Container>
    </>
  );
}
