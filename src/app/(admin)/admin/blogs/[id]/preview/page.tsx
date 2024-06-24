'use client';

import { useContext, useEffect } from 'react';
import Image from 'next/image';
import { Container, rem } from '@mantine/core';
import { AlignLeft, Heart, Search, ShoppingBag, UserRound } from 'lucide-react';

import { PostContent } from '@/app/(root)/(additional)/blog/[id]/ui/PostContent';
import { KEYS } from '@/shared/constants/localStorageKeys';
import { formatDateToLongString } from '@/shared/lib/helpers';
import ShareInSocial from '@/app/(root)/(additional)/blog/[id]/ui/ShareInSocial';
import Footer from '@/modules/Footer';
import HeaderTemplate from '@/components/HeaderTemplate/HeaderTemplate';
import { useSelectPosts } from '@/shared/hooks/useSelectPosts';
import PostList from '@/components/PostList';
import Breadcrumbs from '@/components/Breadcrumbs';
import { PostFormContext } from '@/shared/context/postform.context';

export default function Page() {
  const { form } = useContext(PostFormContext);

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
            { href: '/admin/blogs', text: 'Blogs' },
            { href: `/admin/blogs/${form.values.id}`, text: 'Blog' },
            { text: 'Preview' },
          ]}
          classNames={{ root: 'p-0 pt-[90px] lg:pt-24' }}
        />
      </Container>

      <HeaderTemplate>
        {({ Logo }) => (
          <>
            <Container>
              <div
                className={`flex h-[${rem(73)}] items-center justify-between lg:h-[${rem(83)}]`}
              >
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

      <div className={`relative h-[${rem(280)}] lg:h-[${rem(350)}]`}>
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
          <div className={`lg:w-[${731}] lg:flex-none`}>
            <h1
              className={`mb-4 text-[${rem(32)}]/[1.2] font-bold uppercase lg:text-4xl/normal`}
            >
              {previewContent.title}
            </h1>
            <p className='mb-1 text-sm/normal font-bold lg:text-base'>
              {previewContent.author}
            </p>
            <p className='mb-6 text-sm/normal font-light lg:mb-9 lg:text-base'>
              {formatDateToLongString(Date.now())}
            </p>
            <PostContent content={previewContent.content} />
          </div>

          <div className='space-y-12 lg:space-y-10'>
            <ShareInSocial />
            <div className='space-y-6 lg:space-y-8'>
              <h2
                className={`border-b border-b-brand-grey-600 py-2 text-[${rem(28)}]/normal font-bold capitalize`}
              >
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
