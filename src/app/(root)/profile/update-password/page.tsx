'use client';
import { Button } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { redirect } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import { UpdatePasswordForm } from '../components/UpdatePasswordForm';
import classes from '../styles.module.css';
import { useAuth } from '@/shared/hooks/useAuth';
import { APP_PAGES } from '@/shared/config/pages-url.config';

export default function UpdatePassword() {
  const [isSent, setIsSent] = useState(false);
  const { currentUser, access_token } = useAuth();

  if (!currentUser) redirect(APP_PAGES.LOGIN);

  const proceedCode = async () => {
    try {
      const request = new URLSearchParams({
        email: currentUser.email,
      });

      await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL! + '/users/reset-password',
        request,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      setIsSent(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
        <motion.div
          initial={{ height: "auto" }}
          animate={isSent && { opacity: 0, x: -1000, height: 0 }}
          className='mt-14 flex flex-col items-center px-4 lg:mt-12'
        >
          <hgroup className='text-center'>
            <h1 className='heading'>Update your password</h1>
            <p className={cn(classes.profileParagraph)}>
              <span className='inline-block max-w-[360px]'>
                To change your password, we will send you verification code to{' '}
                <b>{currentUser.email}</b>
              </span>
            </p>
          </hgroup>
          <Button
            classNames={{
              root: cn('btn mt-4 w-full bg-black', classes.inputSizing),
            }}
            onClick={proceedCode}
          >
            Send
          </Button>
        </motion.div>

      <motion.div
        initial={{ height: 0, opacity: 0, x: 1000 }}
        animate={
          isSent
            && {
                x: 0,
                opacity: 1,
                height: "auto"
            }
        }
      >
        <hgroup className='text-center'>
          <h1 className={cn(classes.profileHeading, 'heading')}>
            Update your password
          </h1>
          <p className={cn(classes.profileParagraph)}>
            <span className='inline-block max-w-[360px]'>
              Enter the verification code we just sent to email and create a new
              password
            </span>
          </p>
        </hgroup>
        <UpdatePasswordForm />
      </motion.div>
    </AnimatePresence>
  );
}
