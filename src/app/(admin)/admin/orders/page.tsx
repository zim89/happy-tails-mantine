import Breadcrumbs from '@/components/Breadcrumbs';
import OrderTable from '@/modules/OrderTable';
import { Button } from '@mantine/core';
import { Download, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
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
          <Button
            leftSection={<Download size={20} />}
            size='md'
            variant='default'
          >
            Export
          </Button>
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
