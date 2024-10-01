'use client';

import { cn } from '@/shared/lib/utils';
import { UpdateUserForm } from '../components/UpdateUserForm';

import classes from '../styles.module.css';
import { LoadingOverlay } from '@mantine/core';
import { VerifyEmailForm } from '../components/VerifyEmailForm';
import { useAuth } from '@/shared/hooks/useAuth';

export const UpdateUserDisplay = () => {
  const { currentUser } = useAuth();

  return (
    <div className={cn('relative', classes.box)}>
      <h1 className={cn(classes.boxHeading, 'mb-8 hidden lg:block')}>
        Update your details
      </h1>

      <UpdateUserForm />

      <LoadingOverlay
        visible={!currentUser?.emailVerified}
        zIndex={10}
        overlayProps={{ blur: 2 }}
        loaderProps={{
          children: <VerifyEmailForm />,
        }}
      />
    </div>
  );
};
