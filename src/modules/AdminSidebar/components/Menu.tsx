'use client';

import { Box, Group, UnstyledButton } from '@mantine/core';
import { useContext } from 'react';

import { SidebarLinks } from '../lib/utils';
import { AdminPanelContext, UnsavedChangesContext } from '@/shared/lib/context';
import { cn } from '@/shared/lib/utils';
import { Dropdown } from './Dropdown';
import BlockLink from '@/modules/BlockLink';

type Props = {
  links: SidebarLinks;
};

export const Menu = ({ links }: Props) => {
  const { unsavedChanges } = useContext(UnsavedChangesContext);
  const { openedLink, update } = useContext(AdminPanelContext);

  const setOpened = (label: string) => {
    if (unsavedChanges) return;

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
                  <BlockLink href={item.link} className='inline-flex gap-3 items-center'>
                    <item.icon size={20} />
                    {item.label}
                  </BlockLink>
                </Box>
              </Box>
            </Group>
          </UnstyledButton>
        );
      })}
    </>
  );
};
