import Link from 'next/link';
import React from 'react';

type CategoryBadgeProps = {
  type: 'link' | 'badge';
  path: string;
  name: string;
  position: {
    x: number;
    y: number;
  };
};

export default function CategoryBadge({
  path,
  name,
  position,
  type,
}: CategoryBadgeProps) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <>
        {type === 'link' ? (
          <Link
            style={{
              top: position.y,
              left: position.x,
            }}
            className='group absolute left-[--x] top-[--y] flex rounded-full bg-brand-grey-100/60 disabled:opacity-60'
            href={path}
          >
            {children}
          </Link>
        ) : (
          <button
            style={{
              top: position.y,
              left: position.x,
            }}
            className='group absolute left-[--x] top-[--y] flex rounded-full bg-brand-grey-100/60 disabled:opacity-60'
          >
            {children}
          </button>
        )}
      </>
    );
  };

  return (
    <Wrapper>
      <div className='absolute inset-1 size-4 rounded-full bg-orange-300 group-hover:animate-ping lg:size-7'></div>
      <div className='relative ml-1 mr-3 mt-1 flex size-4 items-center justify-center rounded-full bg-brand-orange-400 group-active:bg-brand-orange-500 group-disabled:bg-gray-500 lg:ml-0 lg:mt-0 lg:size-9'>
        <div className='size-3 bg-white [mask-image:url(https://i.imgur.com/4FsWarQ.png)] [mask-size:contain] lg:size-5'></div>
      </div>
      <p className='text-md/3 pr-3 lg:py-[7px] lg:pr-6 lg:text-lg/5'>{name}</p>
    </Wrapper>
  );
}
