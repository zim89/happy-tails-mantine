'use client';

import { Box, Collapse, Group, Text, UnstyledButton } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { ChevronDown, Minus } from 'lucide-react';

import { LinksGroup } from '../lib/utils';

import { cn } from '@/shared/lib/utils';
import BlockLink from '@/modules/BlockLink';
import { UnsavedChangesContext } from '@/shared/context/unsaved.context';
import { AdminPanelContext } from '@/shared/context/panel.context';

type Props = {
  linksGroup: LinksGroup;
};
export const Dropdown = ({ linksGroup }: Props) => {
  const { unsavedChanges } = useContext(UnsavedChangesContext);
  const { openedLink, update } = useContext(AdminPanelContext);
  const [isOpened, setIsOpened] = useState(false);

  const areThereLinksSelected = linksGroup.links.find(
    (l) => l.label === openedLink
  );

  useEffect(() => {
    if (unsavedChanges) return;

    if (areThereLinksSelected) {
      setIsOpened(true);
    } else if (openedLink !== linksGroup.label) {
      setIsOpened(false);
    }
  }, [openedLink]);

  const setOpened = (label: string) => {
    if (unsavedChanges) return;
    update((prev) => ({ ...prev, openedLink: label }));
  };

  return (
    <div className='hidden w-full md:block'>
      <UnstyledButton
        // It's highlighted when it's clicked or when the page to which child link forwards is opened
        className={cn(
          'w-full py-2 text-brand-grey-400 md:pl-12',
          isOpened &&
            areThereLinksSelected &&
            'bg-brand-orange-400 text-primary'
        )}
        onClick={() => {
          if (unsavedChanges) return;
          setIsOpened(!isOpened);
        }}
        title='Open catalog'
      >
        <Group>
          <Box className='flex items-center'>
            <Box className='inline-flex items-center gap-3 pr-6 text-xl font-bold leading-6 md:ml-4'>
              <linksGroup.icon size={20} />
              <span className='hidden md:inline'>{linksGroup.label}</span>
            </Box>
            <ChevronDown size={20} className='mt-1' />
          </Box>
        </Group>
      </UnstyledButton>
      <Collapse
        in={
          isOpened ||
          (!!linksGroup.links.find((l) => l.label === openedLink) && isOpened)
        }
        className='pb-4'
      >
        {linksGroup.links.map((link, linkKey) => (
          <Text
            c={link.label === openedLink ? '#F39324' : '#C8C8C8'}
            onClick={() => {
              setOpened(link.label);
            }}
            classNames={{ root: 'pl-4 md:pl-16 pr-4' }}
            key={linkKey}
            title={link.label}
          >
            <BlockLink href={link.link} className='inline-flex pt-2 text-lg'>
              <Minus width={7} className='mr-3' /> {link.label}
            </BlockLink>
          </Text>
        ))}
      </Collapse>
    </div>
  );
};
