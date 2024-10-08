'use client';

import { UnstyledButton } from '@mantine/core';

import classes from '../styles.module.css';
import { useAuth } from '@/shared/hooks/useAuth';
import Logout from '@/components/Logout';
import { cn } from '@/shared/lib/utils';

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
          <UnstyledButton
            className='mt-10 w-full rounded-sm bg-secondary py-[10px] text-center font-bold uppercase text-primary md:max-w-[315px] md:self-center'
            onClick={handleLogout}
          >
            Logout
          </UnstyledButton>
        )}
      </Logout>
    </div>
  );
}
