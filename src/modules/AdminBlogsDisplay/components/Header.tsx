import Breadcrumbs from '@/components/Breadcrumbs';
import classes from '../classes.module.css';
import { Button } from '@mantine/core';
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

        <Button
          component={Link}
          href='/admin/blogs/new'
          leftSection={<PlusCircle size={20} />}
          size='md'
          className='ml-6 bg-black'
        >
          Add a new article
        </Button>
      </div>
    </>
  );
};
