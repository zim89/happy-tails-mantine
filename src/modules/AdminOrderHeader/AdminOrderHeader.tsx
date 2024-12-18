'use client';

import { Button, Menu } from '@mantine/core';
import { Download, File, Files, PlusCircle, Printer } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { json2csv } from 'json-2-csv';

import { useSelectOrders } from '@/shared/hooks/useSelectOrders';
import classes from './classes.module.css';
import PageHeader from '@/components/PageHeader';
import { API_URL } from '@/shared/constants/env.const';
import { brandNotification } from '@/shared/lib/helpers';
import { toast } from 'react-toastify';
import { handleError } from '@/shared/helpers/error.helpers';

export default function AdminOrderHeader() {
  const [opened, setOpened] = useState(false);
  const orders = useSelectOrders((state) => state);

  const copyToClipboard = async () => {
    try {
      const data = json2csv(orders);

      if ('clipboard' in navigator) {
        await navigator.clipboard.writeText(data);
      } else {
        // For IE support (just in case)
        document.execCommand('copy', true, data);
      }

      brandNotification('SUCCESS', 'Copied!');
    } catch (err) {
      handleError(err, toast.error);
    }
  };

  return (
    <>
      <PageHeader>
        {(Group) => (
          <>
            <div className='mr-auto print:hidden'>
              <Group
                title='Order List'
                additional='View and check all orders registered on your store'
              />
            </div>

            <Menu
              opened={opened}
              onChange={setOpened}
              width={148}
              position='bottom-start'
              offset={1}
              radius={2}
              classNames={{
                dropdown: classes.dropdown,
                item: 'py-[10px] px-4 hover:bg-primary cursor-pointer',
              }}
            >
              <Menu.Target>
                <Button
                  leftSection={<Download size={20} />}
                  size='md'
                  variant='default'
                  radius={2}
                  className='print:hidden'
                >
                  Export
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => {
                    window.print();
                  }}
                >
                  <Printer size={16} className='mr-2 inline-block' /> Print
                </Menu.Item>
                <Menu.Item>
                  <a href={`${API_URL}/orders/export`} download>
                    <File size={16} className='mr-2 inline-block' /> Csv
                  </a>
                </Menu.Item>
                <Menu.Item onClick={copyToClipboard}>
                  <Files size={16} className='mr-2 inline-block' /> Copy
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <div>
              <Link
                href='/admin/orders/new'
                className='ml-6 flex items-center gap-2 whitespace-pre rounded-[2px] bg-secondary px-4 py-2 font-bold text-primary print:hidden'
              >
                <PlusCircle size={20} />
                Add a new order
              </Link>
            </div>
          </>
        )}
      </PageHeader>
    </>
  );
}
