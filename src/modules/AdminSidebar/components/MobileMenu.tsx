'use client';

import { Menu, UnstyledButton } from '@mantine/core';
import { Minus } from 'lucide-react';
import { useContext, useState } from 'react';

import { LinksGroup } from '../lib/utils';

import { cn } from '@/shared/lib/utils';
import BlockLink from '@/modules/BlockLink';
import { UnsavedChangesContext } from '@/shared/context/unsaved.context';
import { AdminPanelContext } from '@/shared/context/panel.context';

type Props = {
  linksGroup: LinksGroup;
};
export const MobileMenu = ({ linksGroup }: Props) => {
  const { unsavedChanges } = useContext(UnsavedChangesContext);
  const { openedLink, update } = useContext(AdminPanelContext);

  const areThereLinksSelected = linksGroup.links.find(
    (l) => l.label === openedLink
  );

  const [isOpened, setIsOpened] = useState(
    openedLink !== linksGroup.label
      ? false
      : areThereLinksSelected
        ? true
        : false
  );

  const setOpened = (label: string, forceOpened?: boolean) => {
    if (unsavedChanges) return;
    update((prev) => ({ ...prev, openedLink: label }));
    forceOpened && setIsOpened(forceOpened);
  };

  return (
    <div className='w-full md:hidden'>
      <Menu
        opened={isOpened}
        onChange={setIsOpened}
        keepMounted
        position='right-start'
        offset={6}
        withArrow
        arrowPosition='center'
      >
        {/* Menu items */}
        <Menu.Target>
          <UnstyledButton
            onClick={() => setIsOpened(!openedLink)}
            title='Open catalog'
            className={cn(
              'flex w-full justify-center py-2 text-brand-grey-400',
              isOpened &&
                areThereLinksSelected &&
                'bg-brand-orange-400 text-primary'
            )}
          >
            <linksGroup.icon size={20} />
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown classNames={{ dropdown: 'md:hidden' }}>
          {linksGroup.links.map((link, linkKey) => (
            <Menu.Item
              c={link.label === openedLink ? '#F39324' : '#868686'}
              onClick={() => {
                setOpened(link.label, false);
              }}
              classNames={{ item: 'pl-4 pr-4' }}
              key={linkKey}
              title={link.label}
            >
              <BlockLink href={link.link} className='text-md inline-flex pt-2'>
                <Minus width={7} className='mr-3' /> {link.label}
              </BlockLink>
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};
