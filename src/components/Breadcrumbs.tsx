'use client';

import Link from 'next/link';
import { Breadcrumbs as RawBreadcrumbs } from '@mantine/core';

export type Crumb = {
  text: string;
  href?: string;
};

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <RawBreadcrumbs
      classNames={{
        root: '[--bc-separator-margin:2px] text-xs/normal mb-4 md:max-lg:mb-3 lg:text-sm/normal lg:mb-4',
        separator: 'text-secondary text-xs/normal',
      }}
    >
      {crumbs.map((crumb, index, arr) =>
        index !== arr.length - 1 ? (
          <Link key={index} href={crumb.href!}>
            {crumb.text}
          </Link>
        ) : (
          <span key={index} className='text-brand-grey-600'>
            {crumb.text}
          </span>
        )
      )}
    </RawBreadcrumbs>
  );
}
