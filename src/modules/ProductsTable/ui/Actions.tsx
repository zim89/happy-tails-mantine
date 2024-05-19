import { ActionIcon, Menu } from '@mantine/core';
import { CellContext } from '@tanstack/react-table';
import {
  Eye,
  MoreHorizontal,
  Trash2,
  Edit2,
  Check,
  AlertTriangle,
} from 'lucide-react';

import DeleteProductModal from '@/modules/DeleteProductModal';
import UpdateProductModal from '@/modules/UpdateProductModal';
import { Product } from '@/shared/types/types';
import Notify from '@/components/Notify';
import { useNotification } from "@/shared/hooks/useNotification";

export const Actions = ({ ctx }: { ctx: CellContext<Product, unknown> }) => {
  const productLine = ctx.row.original;

  const [setDeleteNotification, { props: deleteNotification, clear: clearDeleteNotification }] = useNotification({
    failed: {
      text: 'Product deletion failed!',
      icon: <AlertTriangle size={24} fill="#DC362E" />,
      color: 'transparent',
    },
    success: {
      text: 'Product successfully deleted!',
      icon: <Check size={24} />,
      color: '#389B48',
    }
  });

  const [setUpdateNotification, { props: updateNotification, clear: clearUpdateNotification }] = useNotification({
    failed: {
      icon: <AlertTriangle size={24} fill="#DC362E" />,
      color: 'transparent',
      text: 'Failed to update!',
    },
    success: {
      icon: <Check size={24} />,
      color: '#389B48',
      text: 'Changes saved!',
    }
  });

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
            <UpdateProductModal
              setNotification={setUpdateNotification}
              productLine={productLine}
            />
          </Menu.Item>
          <Menu.Item
            leftSection={<Trash2 size={16} />}
            className='rounded-none hover:bg-brand-grey-200'
          >
            <DeleteProductModal
              setNotification={setDeleteNotification}
              productLine={productLine}
            />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      {/* Forced to move notifications here, cause I don't want them appear only in opened dropdown menu */}
      <Notify {...deleteNotification} onClose={clearDeleteNotification} />
      <Notify {...updateNotification} onClose={clearUpdateNotification} />
    </>
  );
};
