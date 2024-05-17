import { Menu, UnstyledButton } from '@mantine/core';
import { Eye, Edit2, MoreHorizontal, Trash2, FolderDown } from 'lucide-react';
import Link from 'next/link';

import { Post } from "@/shared/api/postApi";

type Props = {
  ctx: Post
}
export const Actions = ({ ctx }: Props) => {
  return (
    <div className='flex justify-end gap-4'>
      <UnstyledButton
        classNames={{ root: 'flex items-center justify-center border border-solid border-black hover:bg-brand-grey-400 p-2 rounded-[2px]' }}
      >
        <Link href={`/admin/blogs/${ctx.id}`}>
          <Eye size={16} color='black' />
        </Link>
      </UnstyledButton>
      <UnstyledButton
        classNames={{ root: 'flex items-center justify-center border border-solid border-black hover:bg-brand-grey-400 p-2 rounded-[2px]' }}
      >
        <Edit2 size={16} color='black' />
      </UnstyledButton>

      <Menu position='bottom-end'>
        <Menu.Target>
          <UnstyledButton
            classNames={{ root: 'flex items-center justify-center border border-solid border-black hover:bg-brand-grey-400 p-2 rounded-[2px]' }}
          >
            <MoreHorizontal size={16} color='black' />
          </UnstyledButton>
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
