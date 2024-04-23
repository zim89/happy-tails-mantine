import { ActionIcon, Menu } from '@mantine/core';
import { CellContext } from '@tanstack/react-table';
import {
  Eye,
  MoreHorizontal,
  Trash,
  Edit2,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

import DeleteProductModal from '@/modules/DeleteProductModal';
import UpdateProductModal from '@/modules/UpdateProductModal';
import { Product } from '@/shared/types/types';
import Notify, { NotifyProps } from '@/components/Notify';
import check_circle from '@/assets/icons/additional/check-circle.svg';

export const Actions = ({ ctx }: { ctx: CellContext<Product, unknown> }) => {
  const [notificationType, setNotificationType] = useState('');
  const productLine = ctx.row.original;

  const notifyProps: Omit<NotifyProps, 'onClose'> | null =
    notificationType === 'Delete_Success'
      ? {
          text: 'Product successfully deleted!',
          kind: 'success',
          visible: true,
          icon: (
            <Image
              src={check_circle.src}
              alt='Notification'
              width={24}
              height={24}
              className='h-6 w-6'
            />
          ),
          color: 'transparent',
        }
      : notificationType === 'Delete_Failed'
        ? {
            text: 'Product deletion failed!',
            kind: 'fail',
            visible: true,
            icon: <AlertTriangle size={20} />,
            color: '#DC362E',
          }
        : notificationType === 'Update_Success'
          ? {
              kind: 'success',
              icon: <Check size={15} />,
              color: 'transparent',
              visible: true,
              text: 'Changes saved!',
            }
          : notificationType === 'Update_Failed'
            ? {
                kind: 'fail',
                icon: <AlertTriangle size={20} />,
                color: '#DC362E',
                visible: true,
                text: 'Failed to update!',
              }
            : null;

  return (
    <>
      {/* "keepMounted" is used to prevent re-rendering its children which causes flickering */}
      <Menu width={148} position='bottom-end' keepMounted>
        <Menu.Target>
          <ActionIcon className='size-9 border border-brand-grey-400 bg-primary text-secondary hover:bg-brand-grey-300 data-[expanded=true]:bg-brand-grey-300'>
            <MoreHorizontal size={16} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown className='p-0 py-2'>
          <Menu.Item
            leftSection={<Eye />}
            className='mb-1 rounded-none hover:bg-brand-grey-200'
          >
            View
          </Menu.Item>
          <Menu.Item
            leftSection={<Edit2 />}
            className='rounded-none hover:bg-brand-grey-200'
          >
            <UpdateProductModal
              setIsNotified={setNotificationType}
              productLine={productLine}
            />
          </Menu.Item>
          <Menu.Item
            leftSection={<Trash />}
            className='rounded-none hover:bg-brand-grey-200'
          >
            <DeleteProductModal
              setIsNotified={setNotificationType}
              productLine={productLine}
            />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      {/* Forced to move notifications here, cause I don't want them appear only in opened dropdown menu */}
      {/* --- DELETE --- */}
      {/* <Notify
        text='Product successfully deleted!'
        kind='success'
        visible={isDeleted}
        onClose={() => setIsDeleted(false)}
        icon={
          <Image
            src={check_circle.src}
            alt='Notification'
            width={24}
            height={24}
            className='h-6 w-6'
          />
        }
        color='transparent'
      /> */}
      {/* --- UPDATE --- */}
      {/* <Notify
        kind="fail"
        icon={<Check size={15} />}
        color='#389B48'
        visible={isUpdated}
        onClose={() => setIsUpdated(false)}
        text='Changes saved!'
      /> */}
      {notifyProps && (
        <Notify {...notifyProps} onClose={() => setNotificationType('')} />
      )}
    </>
  );
};
