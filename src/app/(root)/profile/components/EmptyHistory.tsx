import { UnstyledButton } from '@mantine/core';
import Link from 'next/link';

import classes from '../styles.module.css';

export const EmptyHistory = () => {
  return (
    <div className={classes.box}>
      <hgroup>
        <h1 className='text-2xl font-light md:whitespace-pre'>
          Your Order History is Currently Empty,{' '}
          <span className='text-brand-orange-800'>Start Shopping now</span>
        </h1>
        <p className={classes.boxParagraph}>
          Your Order History keeps track of all your purchases, making it easy
          to view, manage, and repurchase your favorite items. Once you start
          shopping with us, your orders will appear here, complete with all the
          details you need. Start exploring our wide range of products and find
          something that catches your eye!
        </p>
      </hgroup>
      <UnstyledButton className='btn mb-8 bg-secondary font-bold text-primary'>
        <Link href='/products'>Continue shopping</Link>
      </UnstyledButton>
    </div>
  );
};
