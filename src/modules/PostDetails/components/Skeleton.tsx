import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';
import { Skeleton } from '@mantine/core';

export const PostDetailsSkeleton = () => {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { href: '/admin/', text: 'Dashboard' },
          {
            text: 'Blogs',
            href: '/admin/blogs?page=1',
          },
          { text: 'Blog post' },
        ]}
        classNames={{
          root: 'p-0 m-0 mb-8',
        }}
      />
      <PageHeader>{(Group) => <Group title='Blog post' />}</PageHeader>
      <div className='flex h-screen w-full flex-col gap-10 lg:flex-row'>
        <Skeleton classNames={{ root: 'basis-[40%] flex-1' }} />
        <div className='flex flex-1 flex-col gap-10'>
          <Skeleton classNames={{ root: 'basis-[50%]' }} />
          <Skeleton classNames={{ root: 'basis-[50%]' }} />
        </div>
      </div>
    </>
  );
};
