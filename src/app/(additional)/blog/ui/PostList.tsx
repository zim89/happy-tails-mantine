'use client';
import { useState } from 'react';
import { Loader } from '@mantine/core';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { BackendResponse } from '@/shared/types/types';
import PostCard from '@/app/(additional)/blog/ui/PostCard';
import { fetchAllPosts, Post } from '@/shared/api/postApi';

interface Props {
  posts: BackendResponse<Post[]>;
}

export default function PostList({ posts }: Props) {
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
      <ul className='my-6 grid grid-cols-1 gap-4 md:my-8 md:grid-cols-2 md:gap-y-8 lg:my-10 lg:gap-x-6 lg:gap-y-10'>
        {data.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>
              <PostCard post={post} />
            </Link>
          </li>
        ))}
      </ul>

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
