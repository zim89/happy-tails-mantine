'use client';

import { ActionIcon, Menu } from '@mantine/core';
import { CellContext } from '@tanstack/react-table';
import { MoreHorizontal, Trash2, Edit2 } from 'lucide-react';

import DeleteProductModal from '@/modules/DeleteProductModal';
import { Product } from '@/shared/types/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export const Actions = ({ ctx }: { ctx: CellContext<Product, unknown> }) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const productLine = ctx.row.original;

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
          <Menu.Item className='rounded-none hover:bg-brand-grey-200'>
            <Link
              className='flex h-full w-full items-center gap-3'
              href={`/admin/products/${productLine.id}?fromPage=${page}`}
              shallow
            >
              <Edit2 size={16} />
              Edit
            </Link>
          </Menu.Item>
          <Menu.Item
            leftSection={<Trash2 size={16} />}
            className='rounded-none hover:bg-brand-grey-200'
          >
            <DeleteProductModal productLine={productLine} />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};
