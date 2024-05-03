'use client';

import { Box, Collapse, Group, Text, UnstyledButton } from '@mantine/core';
import { useContext, Fragment, useState } from 'react';
import Link from 'next/link';

import { SidebarLinks } from '../lib/utils';
import { AdminPanelContext } from '@/shared/lib/context';
import { cn } from '@/shared/lib/utils';
import { Dropdown } from './Dropdown';

type Props = {
  links: SidebarLinks;
};
export const Menu = ({ links }: Props) => {
  const { openedLink, update } = useContext(AdminPanelContext);

  const setOpened = (label: string) => {
    update((prev) => ({ ...prev, openedLink: label }));
  };

  return (
    <>
      {links.map((item, itemKey) => {
        return item.id === 'links-group' ? (
          <Dropdown linksGroup={item} key={item.id + itemKey} />
        ) : (
          <UnstyledButton
            className={cn(
              'w-full py-2 pl-10 text-[#C8C8C8]',
              openedLink === item.label && 'bg-[#F39324] text-[#FDFDFD]'
            )}
            onClick={() => setOpened(item.label)}
            key={item.id + itemKey}
          >
            <Group>
              <Box className='flex'>
                <Box ml='md' className='text-xl font-bold leading-6'>
                  <Link href={item.link} className='inline-flex gap-3 items-center'>
                    <item.icon size={20} />
                    {item.label}
                  </Link>
                </Box>
              </Box>
            </Group>
          </UnstyledButton>
        );
      })}
    </>
  );
};
