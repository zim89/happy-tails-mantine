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
    <div className='flex flex-col items-center'>
      {links.map((item, itemKey) => {
        return item.id === 'links-group' ? (
          <Fragment key={item.id + itemKey}>
            {/* Visible since tablets and so on */}
            <Dropdown linksGroup={item} />

            {/* Visible on mobile screen */}
            <MobileMenu linksGroup={item} />
          </Fragment>
        ) : (
          <UnstyledButton
            className={cn(
              'w-full py-2 text-brand-grey-400 md:px-10',
              openedLink === item.label && 'bg-brand-orange-400 text-primary'
            )}
            onClick={() => setOpened(item.label)}
            key={item.id + itemKey}
            title={item.label}
          >
            <Group classNames={{ root: 'justify-center md:justify-start' }}>
              <Box>
                <Box className='text-xl font-bold leading-6 md:ml-4'>
                  <BlockLink
                    href={item.link}
                    className='inline-flex items-center justify-center gap-3'
                  >
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
