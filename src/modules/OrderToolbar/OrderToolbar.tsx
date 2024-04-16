'use client';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import SearchField from '@/components/SearchField';
import { Group, Menu, UnstyledButton } from '@mantine/core';
import { ChevronDown } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';

const menu = [
  { label: 'For all time', value: 'all' },
  { label: 'For the last 30 days', value: 'L30D' },
  { label: 'For the last 6 months', value: 'L6M' },
  { label: '2023', value: '2023' },
  { label: '2022', value: '2022' },
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
    router.push(
      pathname +
        '?' +
        createQueryString({
          time: selected.value,
        })
    );

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
                root: 'flex gap-6 border-[1px] border-[#ced4da] border-solid p-[6px] rounded-sm',
              }}
              data-expanded={opened || undefined}
            >
              <Group gap='xs'>
                <span>{selected.label}</span>
              </Group>
              <ChevronDown />
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>{items}</Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
}
