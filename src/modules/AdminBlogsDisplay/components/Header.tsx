import Breadcrumbs from '@/components/Breadcrumbs';
import classes from '../classes.module.css';
import { Button, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export const Header = () => {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { text: 'Dashboard', href: '/admin/' },
          { text: 'Blogs', href: '/admin/blogs' },
        ]}
        classNames={{
          root: 'p-0 m-0 mb-8',
        }}
      />
      <div className={classes.header}>
        <hgroup className={classes.pageHeading}>
          <h2>Blogs</h2>
          <p>Streamlining content management on your store</p>
        </hgroup>

        <UnstyledButton
          component={Link}
          href='/admin/blogs/new'
          className='bg-black gap-2 text-white font-bold flex items-center py-[10px] px-4 rounded'
        >
          <PlusCircle size={20} />Add a new article
        </UnstyledButton>
      </div>
    </>
  );
};
