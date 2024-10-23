'use client';

import { Container } from '@mantine/core';
import Image from 'next/image';
import { useContext, useEffect } from 'react';
import { AlignLeft, Heart, Search, ShoppingBag, UserRound } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { PostContent } from '@/app/(root)/(additional)/blog/[id]/ui/PostContent';
import ShareInSocial from '@/app/(root)/(additional)/blog/[id]/ui/ShareInSocial';
import PostList from '@/components/PostList';
import { KEYS } from '@/shared/constants/localStorageKeys';
import { PostFormContext } from '@/shared/context/postform.context';
import { useSelectPosts } from '@/shared/hooks/useSelectPosts';
import { formatYearFromDate, getCurrentMonth } from '@/shared/lib/helpers';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeaderTemplate from '@/components/HeaderTemplate';
import Footer from '../Footer';

export default function BlogPreview() {
  const { form } = useContext(PostFormContext);
  const params = useSearchParams();
  const page = params.get('fromPage');

  const posts = useSelectPosts((state) => state.slice(0, 5));

  const previewContent: (typeof form)['values'] = localStorage.getItem(
    KEYS['TEMP_PREVIEW']
  )
    ? JSON.parse(localStorage.getItem(KEYS['TEMP_PREVIEW'])!)
    : form.values;

  useEffect(() => {
    return () => {
      localStorage.removeItem(KEYS['TEMP_PREVIEW']);
    };
  }, []);

  return (
    <>
      <Container>
        <Breadcrumbs
          crumbs={[
            { href: '/admin/', text: 'Dashboard' },
            { href: `/admin/blogs?page=${page}`, text: 'Blogs' },
            {
              href: `/admin/blogs/${form.values.id}?fromPage=${page}`,
              text: 'Blog',
            },
            { text: 'Preview' },
          ]}
          classNames={{ root: 'p-0 pt-[90px] lg:pt-24' }}
        />
      </Container>

      <HeaderTemplate>
        {({ Logo }) => (
          <>
            <Container>
              <div className='flex h-[73px] items-center justify-between lg:h-[83px]'>
                <div className='flex gap-4'>
                  <AlignLeft className='iconBtn' />
                  <span className='md:hidden'>
                    <Search className='iconBtn' />
                  </span>
                </div>

                <Logo />

                <div className='flex items-center gap-4 md:gap-8'>
                  <span className='hidden md:block'>
                    <Search className='iconBtn' />
                  </span>
                  <div className='hidden items-center justify-center text-secondary lg:flex'>
                    <UserRound className='iconBtn' />
                  </div>
                  <Heart className='iconBtn' />
                  <ShoppingBag className='iconBtn' />
                </div>
              </div>
            </Container>
          </>
        )}
      </HeaderTemplate>

      <div className='relative h-[280px] lg:h-[350px]'>
        {typeof previewContent.image === 'string' && (
          <Image
            src={previewContent.image}
            alt={previewContent.title}
            fill
            priority={true}
            className='object-cover'
          />
        )}
      </div>

      <Container>
        <div className='flex flex-col gap-8 py-12 lg:flex-row lg:gap-[65px] lg:pb-[72px] lg:pt-16'>
          <div className='lg:w-[731px] lg:flex-none'>
            <h1 className='mb-4 text-[2rem]/[1.2] font-bold uppercase lg:text-4xl/normal'>
              {previewContent.title}
            </h1>
            <p className='mb-1 text-sm/normal font-bold lg:text-base'>
              {previewContent.author}
            </p>
            <p className='mb-6 text-sm/normal font-light lg:mb-9 lg:text-base'>
              {getCurrentMonth()}, {formatYearFromDate(Date.now())}
            </p>
            <PostContent content={previewContent.content} />
          </div>

          <div className='space-y-12 lg:space-y-10'>
            <ShareInSocial
              link={`${process.env.NEXT_PUBLIC_SITE_DOMAIN}/blog/${previewContent.id}`}
              description={`Checkout this post on Happy Tails: ${previewContent.title}`}
              image={previewContent.image as string}
            />
            <div className='space-y-6 lg:space-y-8'>
              <h2 className='border-b border-b-brand-grey-600 py-2 text-[1.75rem]/normal font-bold capitalize'>
                Most Popular
              </h2>
              <div className='pointer-events-none'>
                <PostList posts={posts} />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className='pointer-events-none'>
        <Footer />
      </div>
    </>
  );
}
