import React, { Suspense } from 'react';
import { Container } from '@mantine/core';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { PostContent } from './ui/PostContent';
import ShareInSocial from './ui/ShareInSocial';
import PopularPosts from './ui/PopularPosts';
import { fetchOnePost } from '@/shared/lib/requests';
import { formatDateToLongString, formatDateToISO } from '@/shared/lib/helpers';

export default async function Page({ params }: { params: { id: string } }) {
  const post = await fetchOnePost(params.id);

  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    image: post.posterImgSrc,
    datePublished: formatDateToISO(post.publishedAt?.toString()),
    dateModified: formatDateToISO(
      (post.updatedAt || post.publishedAt)?.toString()
    ),
    author: {
      '@type': 'Person',
      name: post.authorName,
    },
  };

  return (
    <>
      <Script
        id='blog-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <>
        <Container>
          <Breadcrumbs
            crumbs={[
              { href: '/', text: 'Home' },
              { href: '/blog', text: 'Blog' },
              { text: post.title },
            ]}
            classNames={{ root: 'p-0 pt-4' }}
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
                    {formatDateToLongString(post.createdAt)}
                  </p>
                  <PostContent content={post.content} />
                </div>

                <div className='space-y-12 lg:space-y-10'>
                  <ShareInSocial
                    link={`${process.env.NEXT_PUBLIC_SITE_DOMAIN}/blog/${post.id}`}
                    description={`Checkout this post on Happy Tails: ${post.title}`}
                    image={post.posterImgSrc}
                  />
                  <Suspense fallback={null}>
                    <PopularPosts />
                  </Suspense>
                </div>
              </div>
            </Container>
          </>
        )}
      </>
    </>
  );
}
