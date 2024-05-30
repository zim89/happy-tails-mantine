'use client';

import { Box, Group, UnstyledButton } from '@mantine/core';
import { useContext, Fragment } from 'react';

import { SidebarLinks } from '../lib/utils';
import { AdminPanelContext, UnsavedChangesContext } from '@/shared/lib/context';
import { cn } from '@/shared/lib/utils';
import { Dropdown } from './Dropdown';
import BlockLink from '@/modules/BlockLink';
import { MobileMenu } from './MobileMenu';

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
    <div className="flex flex-col items-center">
      {links.map((item, itemKey) => {
        return item.id === 'links-group' ? (
          <Fragment key={item.id + itemKey} >
            {/* Visible since tablets and so on */}
            <Dropdown linksGroup={item} />
            
            {/* Visible on mobile screen */}
            <MobileMenu linksGroup={item} />
          </Fragment>
        ) : (
          <UnstyledButton
            className={cn(
              'w-full py-2 md:px-10 text-[#C8C8C8]',
              openedLink === item.label && 'bg-[#F39324] text-[#FDFDFD]'
            )}
            onClick={() => setOpened(item.label)}
            key={item.id + itemKey}
            title={item.label}
          >
            <Group>
              <Box className='flex'>
                <Box className='text-xl font-bold leading-6 ml-3 md:ml-4'>
                  <BlockLink href={item.link} className='inline-flex gap-3 items-center'>
                    <item.icon size={20} />
                    <span className='hidden md:inline'>{item.label}</span>
                  </BlockLink>
                </Box>
              </Box>
            </Group>
          </UnstyledButton>
        );
      })}
    </div>
  );
};
