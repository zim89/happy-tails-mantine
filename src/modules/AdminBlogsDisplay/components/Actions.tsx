import { Menu } from '@mantine/core';
import { Eye, Edit2, MoreHorizontal, Trash2, FolderDown } from 'lucide-react';
import { Button } from '@mantine/core';
import Link from 'next/link';

export const Actions = () => {
  return (
    <div className='flex justify-end gap-4'>
      <Button
        classNames={{ root: 'border border-black w-9 p-0 rounded-[2px]' }}
      >
        <Eye size={16} color='black' />
      </Button>
      <Button
        classNames={{ root: 'border border-black w-9 p-0 rounded-[2px]' }}
      >
        <Edit2 size={16} color='black' />
      </Button>

      <Menu position='bottom-end'>
        <Menu.Target>
          <Button
            classNames={{ root: 'border border-black w-9 p-0 rounded-[2px]' }}
          >
            <MoreHorizontal size={16} color='black' />
          </Button>
        </Menu.Target>

        <Menu.Dropdown className='p-0 py-2'>
          <Menu.Item
            leftSection={<FolderDown size={16} />}
            className='mb-1 rounded-none hover:bg-brand-grey-200'
          >
            <Link href={`/admin/blogs`}>Archive</Link>
          </Menu.Item>
          <Menu.Item
            leftSection={<Trash2 size={16} />}
            className='rounded-none hover:bg-brand-grey-200'
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};
