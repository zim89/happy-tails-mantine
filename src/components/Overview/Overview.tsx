'use client';

import React, { useRef } from 'react';
import { useDisclosure } from '@mantine/hooks';

import styles from './style.module.css';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export default function Overview({ children }: { children: React.ReactNode }) {
  const collapse = useRef<HTMLDivElement>(null);
  const [opened, { toggle }] = useDisclosure(false);

  const onCollapse = () => {
    if (!collapse.current) return;

    toggle();
    const totalHeight = collapse.current.scrollHeight;

    collapse.current.style.maxHeight = `${opened ? 430 : totalHeight}px`;
  };

  return (
    <div className={cn('text-left', styles.markdown)}>
      <div
        ref={collapse}
        className='relative max-h-[26.875rem] overflow-hidden transition-[max-height] duration-500'
      >
        <div
          className={cn(
            'absolute bottom-0 h-[15.3125rem] w-screen bg-[linear-gradient(356deg,_#fdfdfd_29.88%,_transparent_92.68%)] transition-opacity duration-500 md:h-[13.6875rem] lg:h-[10.375rem]',
            opened && 'opacity-0'
          )}
        ></div>
        {children}
      </div>
      <button
        className='mt-2 w-36 py-2.5 text-left font-bold'
        onClick={onCollapse}
      >
        {opened ? 'See less' : 'Show more'}
        <ChevronDown className={cn('ml-2 inline', opened && '-scale-y-100')} />
      </button>
    </div>
  );
}
