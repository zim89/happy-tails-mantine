'use client';
import { useState } from 'react';
import { Minus } from 'lucide-react';
import { Box, Collapse, Group, UnstyledButton, rem } from '@mantine/core';
import Link from 'next/link';

import classes from './LinksGroup.module.css';
import { cn } from '@/shared/lib/utils';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}
function Links({
  icon: Icon,
  label,
  initiallyOpened,
  links,
}: LinksGroupProps) {
  // TODO: change links' appeareance
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const [selected, setSelected] = useState("");
  

  const items = (hasLinks ? links : []).map((link) => {
    return <Link className={cn(classes.link)} style={{
      color: selected === link.label ? "orange" : "#C8C8C8"
    }} href={link.link} key={link.label} onClick={() => setSelected(link.label)}>
      <Minus className='scale-x-50' />
      <span>{link.label}</span>
    </Link>
  });

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className='w-full py-2 pl-14'
        style={
          opened
            ? { backgroundColor: '#F39324' }
            : { backgroundColor: 'transparent' }
        }
      >
        <Group>
          <Box className='flex'>
            <Icon style={{ width: rem(22), height: rem(22), color: 'white' }} />
            <Box ml='md' className='text-xl font-bold leading-6 text-white'>
              {label}
            </Box>
          </Box>
        </Group>
      </UnstyledButton>
      {hasLinks ? (
        <Collapse className={opened ? 'mb-8' : 'mb-0'} in={opened}>
          {items}
        </Collapse>
      ) : null}
    </>
  );
}

export default Links;