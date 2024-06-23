'use client';

import { useSelectOrders } from '@/shared/hooks/useSelectOrders';
import { Button, Menu } from '@mantine/core';
import {
  AlertTriangle,
  Check,
  Download,
  File,
  Files,
  PlusCircle,
  Printer,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { json2csv } from 'json-2-csv';

import { useNotification } from '@/shared/hooks/useNotification';
import Notification from '@/components/Notify';
import classes from './classes.module.css';

export default function AdminOrderHeader() {
  const [opened, setOpened] = useState(false);
  const orders = useSelectOrders((state) => state);

  const [setNotification, { props, clear }] = useNotification({
    failed: {
      icon: <AlertTriangle size={24} fill='#DC362E' />,
      color: 'transparent',
      text: "Couldn't copy. Please try again.",
    },
    success: {
      icon: <Check size={24} />,
      color: '#389B48',
      text: 'Copied!',
    },
  });

  const copyToClipboard = async () => {
    try {
      const data = json2csv(orders);

      if ('clipboard' in navigator) {
        await navigator.clipboard.writeText(data);
      } else {
        // For IE support (just in case)
        document.execCommand('copy', true, data);
      }

      setNotification('Success');
    } catch (err) {
      console.log(err);
      setNotification('Failed');
    }
  };

  return (
    <div className={classes.header}>
      <hgroup className='mr-auto'>
        <h2>Order List</h2>
        <p>View and check all orders registered on your store</p>
      </hgroup>
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
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/orders/export`}
              download
            >
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
          className='ml-6 flex items-center gap-2 whitespace-pre rounded-[2px] bg-secondary px-4 py-2 font-bold text-primary'
        >
          <PlusCircle size={20} />
          Add a new order
        </Link>
      </div>
      <Notification {...props} onClose={clear} />
    </div>
  );
}
