'use client';
import Link from 'next/link';
import { useSearchParams } from "next/navigation";

import classes from '../styles.module.css';
import { useAuth } from '@/shared/hooks/useAuth';
import Logout from '@/components/Logout';
import { cn } from '@/shared/lib/utils';
import { Button } from '@mantine/core';
import { useEffect } from 'react';

export default function UserAccount() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;  

  return (
    <div className={classes.profileContent}>
      <hgroup>
        <h1 className={cn(classes.profileHeading, 'heading')}>
          My Personal Account
        </h1>
        <p className={classes.profileParagraph}>
          Hello {currentUser.firstName}, welcome to your Happy Tails account.
          Here you can manage your details, repeat orders and view your order
          history.
        </p>
      </hgroup>
      <Logout>
        {(handleLogout) => (
          <Button
            className='rounded-sm bg-black uppercase md:self-center'
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </Logout>
    </div>
  );
}
