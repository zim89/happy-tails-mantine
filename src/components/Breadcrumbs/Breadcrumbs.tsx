'use client';

import {
  BreadcrumbsStylesNames,
  Breadcrumbs as RawBreadcrumbs,
} from '@mantine/core';

import { cn } from '@/shared/lib/utils';
import BlockLink from '@/modules/BlockLink';

export type Crumb = {
  text: string;
  href?: string;
};

export type Props = {
  crumbs: Crumb[];
  classNames?: Partial<Record<BreadcrumbsStylesNames, string>>;
};

export default function Breadcrumbs({ crumbs, classNames = {} }: Props) {
  return (
    <RawBreadcrumbs
      classNames={{
        ...classNames,
        separator: cn('text-xs/normal text-secondary', classNames.separator),
        root: cn(
          'mb-4 py-3 text-xs/normal [--bc-separator-margin:2px] md:max-lg:mb-3 lg:mb-4 lg:text-sm/normal',
          classNames.root
        ),
      }}
      data-testid='breadcrumbs'
    >
      {crumbs.map((crumb, index, arr) => (
        <div
          data-testid='crumb'
          className='max-w-[90vw] overflow-hidden text-ellipsis'
          key={index}
        >
          {index !== arr.length - 1 ? (
            <BlockLink href={crumb.href!}>{crumb.text}</BlockLink>
          ) : (
            <span className='text-brand-grey-600'>{crumb.text}</span>
          )}
        </div>
      ))}
    </RawBreadcrumbs>
  );
}
