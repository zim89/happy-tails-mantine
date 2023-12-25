import * as React from 'react';
import { navLinks } from '@/lib/data';
import Link from 'next/link';
import { Group } from '@mantine/core';

export default function Header() {
  return (
    <Group justify='center'>
      {navLinks.map((link) => (
        <Link key={link.label} href={link.href}>
          {link.label}
        </Link>
      ))}
    </Group>
  );
}
