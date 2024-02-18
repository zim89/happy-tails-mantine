import React, { Suspense } from 'react';
import { Container } from '@mantine/core';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareInSocial from '@/app/(additional)/blog/[id]/ui/ShareInSocial';
import PopularPosts from '@/app/(additional)/blog/[id]/ui/PopularPosts';
import { fetchOnePost } from '@/shared/api/postApi';
import { formatDate } from '@/shared/lib/helpers';

export default async function Page({ params }: { params: { id: string } }) {
  const post = await fetchOnePost(params.id);

  if (!post) notFound();

  return (
    <>
      <Container>
        <Breadcrumbs
          crumbs={[
            { href: '/', text: 'Home' },
            { href: '/blog', text: 'Blog' },
            { text: post.title },
          ]}
        />
      </Container>

      {post && (
        <>
          <div className='relative h-[280px] lg:h-[350px]'>
            <Image
              src={post.posterImgSrc}
              alt={post.title}
              fill
              priority={true}
              className='object-cover'
            />
          </div>

          <Container>
            <div className='flex flex-col gap-8 py-12 lg:flex-row lg:gap-[65px] lg:pb-[72px] lg:pt-16'>
              <div className='lg:w-[731px] lg:flex-none'>
                <h1 className='mb-4 text-[32px]/[1.2] font-bold uppercase lg:text-4xl/normal'>
                  {post.title}
                </h1>
                <p className='mb-1 text-sm/normal font-bold lg:text-base'>
                  {post.authorName}
                </p>
                <p className='mb-6 text-sm/normal font-light lg:mb-9 lg:text-base'>
                  {formatDate(post.createdAt)}
                </p>
                <p>{post.content}</p>
              </div>

              <div className='space-y-12 lg:space-y-10'>
                <ShareInSocial />
                <Suspense fallback={null}>
                  <PopularPosts />
                </Suspense>
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
}
