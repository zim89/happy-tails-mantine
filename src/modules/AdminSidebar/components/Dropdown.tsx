'use client';

import { Box, Collapse, Group, Text, UnstyledButton } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { Minus } from "lucide-react";

import { LinksGroup } from '../lib/utils';
import { AdminPanelContext, UnsavedChangesContext } from '@/shared/lib/context';
import { cn } from '@/shared/lib/utils';
import BlockLink from '@/modules/BlockLink';

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
    <>
      <UnstyledButton
        // It's highlighted when it's clicked or when the page to which child link forwards is opened
        className={cn('w-full py-2 pl-10 text-[#C8C8C8]', (isOpened && areThereLinksSelected) && 'bg-[#F39324] text-[#FDFDFD]')}
        onClick={() => {
          if (unsavedChanges) return;
          setIsOpened(!isOpened);
        }}
      >
        <Group>
          <Box className='flex'>
            <Box ml='md' className='text-xl font-bold leading-6 inline-flex gap-3 items-center'>
              <linksGroup.icon size={20} />
              {linksGroup.label}
            </Box>
          </Box>
        </Group>
      </UnstyledButton>
      <Collapse
        in={
          isOpened ||
          (!!linksGroup.links.find((l) => l.label === openedLink) && isOpened)
        }
        className='pb-8'
      >
        {linksGroup.links.map((link, linkKey) => (
          <Text
            c={link.label === openedLink ? '#F39324' : '#C8C8C8'}
            onClick={() => {
              setOpened(link.label);
            }}
            classNames={{ root: "pl-14" }}
            key={linkKey}
          >
            <BlockLink href={link.link} className='pt-2 inline-flex text-lg'><Minus width={7} className='mr-3' /> {link.label}</BlockLink>
          </Text>
        ))}
      </Collapse>
    </>
  );
};
