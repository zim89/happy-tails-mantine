'use client';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Group, Menu, UnstyledButton } from '@mantine/core';
import { ChevronDown } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';

import SearchField from '@/components/SearchField';

const menu = [
  { label: 'For all time', value: 'all' },
  { label: 'For the last 30 days', value: 'L30D' },
  { label: 'For the last 6 months', value: 'L6M' },
  { label: '2023', value: 'YPAST' },
  { label: '2022', value: '2YPAST' },
];

export default function OrderToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState(menu[0]);
  const [opened, { open, close }] = useDisclosure();

  const createQueryString = useCallback(
    (values: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(values).forEach(([key, value]) =>
        value ? params.set(key, value) : params.delete(key)
      );

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (selected.value === 'all') {
      router.replace('/profile/order-history');
    } else {
      router.push(
        pathname +
          '?' +
          createQueryString({
            filter: selected.value,
          })
      );
    }

    close();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected.value]);

  const items = menu.map((item) => (
    <Menu.Item onClick={() => setSelected(item)} key={item.label}>
      {item.label}
    </Menu.Item>
  ));

  return (
    <div className='flex items-center gap-4'>
      <div className='flex-1'>
        <SearchField placeholder='Search by all orders' />
      </div>
      <div className='ml-auto'>
        <Menu onOpen={open} onClose={close} radius='md' withinPortal>
          <Menu.Target>
            <UnstyledButton
              classNames={{
                root: 'flex  items-center gap-6 border border-brand-grey-400 border-solid text-sm py-2 px-4 rounded-sm',
              }}
              data-expanded={opened || undefined}
            >
              <Group gap='xs'>
                <span className='text-brand-grey-600'>{selected.label}</span>
              </Group>
              <ChevronDown size={16} strokeWidth={3} />
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>{items}</Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
}
