'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Loader } from '@mantine/core';

import { cn } from '@/shared/lib/utils';
import type { BackendResponse } from '@/shared/types/types';
import { Post } from '@/shared/api/postApi';
import { fetchAllPosts } from '@/shared/lib/requests';
import PostCard from './PostCard';
import { PostCards } from './PostCards';

interface Props {
  posts: BackendResponse<Post[]>;
  external?: boolean;
}

export default function PostList({ posts, external }: Props) {
  const [data, setData] = useState<Post[]>(posts.content ?? []);
  const [page, setPage] = useState(1);
  const [totalPages] = useState(posts.totalPages);
  const [limit] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async () => {
    setIsLoading(true);
    const res = await fetchAllPosts(page, limit);
    setData([...data, ...res.content]);
    setIsLoading(false);
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  if (!posts.content || posts.content.length === 0) {
    return <p className='mt-4 text-gray-400'>No data available.</p>;
  }

  return (
    <>
      <PostCards posts={data} />

      {page < totalPages && (
        <button
          type='button'
          onClick={handleLoadMore}
          className={cn(
            'btn btn-secondary relative block md:mx-auto md:w-[174px]',
            isLoading && 'opacity-40'
          )}
          disabled={isLoading}
        >
          <Loader
            color='orange'
            size={28}
            classNames={{
              root: cn(
                'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                !isLoading && 'hidden'
              ),
            }}
          />
          Read more
        </button>
      )}
    </>
  );
}
