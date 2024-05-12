'use client';

import Link from 'next/link';
import { BreadcrumbsStylesNames, Breadcrumbs as RawBreadcrumbs } from '@mantine/core';
import { cn } from '@/shared/lib/utils';

export type Crumb = {
  text: string;
  href?: string;
};

export default function Breadcrumbs({ crumbs, classNames = {} }: { crumbs: Crumb[], classNames?: Partial<Record<BreadcrumbsStylesNames, string>> }) {
  return (
    <RawBreadcrumbs
      classNames={{
        ...classNames,
        separator: cn('text-secondary text-xs/normal', classNames.separator),
        root: cn('[--bc-separator-margin:2px] text-xs/normal py-3 mb-4 md:max-lg:mb-3 lg:text-sm/normal lg:mb-4', classNames.root),
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
