'use client';

import { Container } from '@mantine/core';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import SliderMenu from '@/modules/ProfileMenu/mobile';
import SidebarMenu from '@/modules/ProfileMenu/laptop';

import classes from './styles.module.css';
import { useAuth } from '@/shared/hooks/useAuth';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import { useZoom } from '@/shared/hooks/useZoom';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { isAuth } = useAuth();
  const router = useRouter();

  // Because of the slider, the page is zoomed in a bit, so we need to scale it down
  useZoom(0.88);

  useEffect(() => {
    if (!isAuth) router.push(APP_PAGES.UNAUTHORIZED);
  }, [isAuth, router]);

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
