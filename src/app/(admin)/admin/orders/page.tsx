"use client";
import Breadcrumbs from '@/components/Breadcrumbs';
import OrderTable from '@/modules/OrderTable';
import { Button, Menu } from '@mantine/core';
import { Download, File, Files, PlusCircle, Printer } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <div className='mb-8'>
        <Breadcrumbs
          crumbs={[{ href: '/admin/', text: 'Admin' }, { text: 'Orders' }]}
        />
      </div>
      <section>
        <div className='mb-6 flex'>
          <hgroup className='mr-auto'>
            <h2 className='mb-2 text-[1.75rem]/[normal] font-bold lg:text-4xl/[normal]'>
              Order List
            </h2>
            <p>View and check all orders registered on your store</p>
          </hgroup>
          <Menu opened={opened} onChange={setOpened} width={148} position="bottom-start" offset={1} radius={2} classNames={{
            dropdown: "p-0",
            item: "py-[10p] px-4 hover:bg-[#F7F7F7] cursor-pointer"
          }}>
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
              <Menu.Item>
                <Printer size={16} className='inline-block mr-2'/> Print
              </Menu.Item>
              <Menu.Item>
              <File size={16} className='inline-block mr-2'/> Csv
              </Menu.Item>
              <Menu.Item>
              <Files size={16} className='inline-block mr-2'/> Copy
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <Button
            component={Link}
            href='/admin/orders/new'
            leftSection={<PlusCircle size={20} />}
            size='md'
            className='ml-6 bg-black'
          >
            Add a new order
          </Button>
        </div>
        <OrderTable />
      </section>
    </div>
  );
}
