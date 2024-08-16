import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

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
      <PageHeader
        rightSection={
          <UnstyledButton
            component={Link}
            href='/admin/blogs/new'
            className='flex items-center gap-2 rounded bg-secondary px-4 py-[10px] font-bold text-primary'
          >
            <PlusCircle size={20} />
            Add a new article
          </UnstyledButton>
        }
      >
        {(Group) => (
          <>
            <Group
              title='Blogs'
              additional='Streamlining content management on your store'
            />
          </>
        )}
      </PageHeader>
    </>
  );
};
