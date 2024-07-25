'use client';

import { ActionIcon, Menu } from '@mantine/core';
import { CellContext } from '@tanstack/react-table';
import { MoreHorizontal, Trash2, Edit2 } from 'lucide-react';
import { useContext, useEffect } from 'react';

import DeleteProductModal from '@/modules/DeleteProductModal';
import UpdateProductModal from '@/modules/UpdateProductModal';
import { Product } from '@/shared/types/types';
import { notifyContext } from '@/shared/context/notification.context';
import Link from 'next/link';

export const Actions = ({ ctx }: { ctx: CellContext<Product, unknown> }) => {
  const productLine = ctx.row.original;
  const { setNotification, setParams } = useContext(notifyContext);

  useEffect(() => {
    setParams((prev) => ({
      success: {
        ...prev.success,
        text: 'Product deleted successfully!',
      },
      failed: prev.failed,
    }));
  }, []);

  return (
    <>
      {/* "keepMounted" is used to prevent re-rendering its children which causes flickering */}
      <Menu width={148} position='bottom-end' keepMounted>
        <Menu.Target>
          <ActionIcon className='size-9 border border-brand-grey-400 bg-primary text-secondary hover:bg-brand-grey-300 hover:text-secondary data-[expanded=true]:bg-brand-grey-300'>
            <MoreHorizontal size={16} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown className='p-0 py-2'>
          <Menu.Item
            leftSection={<Edit2 size={16} />}
            className='rounded-none hover:bg-brand-grey-200'
          >
            {/* <UpdateProductModal
              setNotification={setNotification}
              productLine={productLine}
            /> */}
            <Link href={`/admin/products/${productLine.id}`}>Edit</Link>
          </Menu.Item>
          <Menu.Item
            leftSection={<Trash2 size={16} />}
            className='rounded-none hover:bg-brand-grey-200'
          >
            <DeleteProductModal
              setNotification={setNotification}
              productLine={productLine}
            />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};
