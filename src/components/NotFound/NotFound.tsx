'use client';
import Image from 'next/image';
import Link from 'next/link';

import { useDeviceSize } from '@/shared/lib/hooks';
import { Button } from '@mantine/core';
import classes from './styles.module.css';
import { cn } from '@/shared/lib/utils';

export default function NotFound() {
  const { isDesktop } = useDeviceSize();

  return (
    <div className={classes.wrapper}>
      <Image
        data-testid='image'
        className={classes.image}
        src='https://i.imgur.com/DxNCZvh.png'
        width={isDesktop ? 700 : 460}
        height={isDesktop ? 575 : 375}
        alt='Dog looks on 404 page'
      />
      <div className={classes.rightSection}>
        <p className={cn(classes.primaryText, 'text-secondary')}>Ooops...</p>
        <p className={cn(classes.primaryText, 'text-brand-orange-400')}>
          Page not found
        </p>
        <p className={classes.secondaryText}>
          {`The page you are looking for doesn’t exist or an other error occurred,
          go back to home page.`}
        </p>
        <Button classNames={{ root: classes.button }}>
          <Link role='link' href='/'>
            Back to homepage
          </Link>
        </Button>
      </div>
    </div>
  );
}
