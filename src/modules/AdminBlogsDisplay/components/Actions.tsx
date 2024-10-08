import { Menu, UnstyledButton } from '@mantine/core';
import { Eye, Edit2, MoreHorizontal, Trash2, FolderDown } from 'lucide-react';
import Link from 'next/link';

import { Post } from '@/shared/api/postApi';
import DeletePostModal from '@/modules/DeletePostModal';
import ArchivePostModal from '@/modules/ArchivePostModal';

type Props = {
  post: Post;
};
export const Actions = ({ post }: Props) => {
  return (
    <div className='flex justify-end gap-4'>
      <Link href={`/admin/blogs/${post.id}/preview`}>
        <UnstyledButton
          classNames={{
            root: 'flex items-center justify-center border border-solid border-brand-grey-400 hover:bg-brand-grey-400 p-2 rounded-sm',
          }}
        >
          <Eye size={16} color='black' />
        </UnstyledButton>
      </Link>
      <Link href={`/admin/blogs/${post.id}`}>
        <UnstyledButton
          classNames={{
            root: 'flex items-center justify-center border border-solid border-brand-grey-400 hover:bg-brand-grey-400 p-2 rounded-sm',
          }}
        >
          <Edit2 size={16} color='black' />
        </UnstyledButton>
      </Link>

      <Menu width={148} position='bottom-end' keepMounted>
        <Menu.Target>
          <UnstyledButton
            classNames={{
              root: 'flex items-center justify-center border border-solid border-brand-grey-400 hover:bg-brand-grey-400 p-2 rounded-sm',
            }}
          >
            <MoreHorizontal size={16} color='black' />
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown className='p-0 py-2'>
          <Menu.Item
            leftSection={<FolderDown size={16} />}
            className='mb-1 rounded-none hover:bg-brand-grey-200'
          >
            <ArchivePostModal id={post.id} />
          </Menu.Item>
          <Menu.Item
            leftSection={<Trash2 size={16} />}
            className='rounded-none hover:bg-brand-grey-200'
          >
            <DeletePostModal id={post.id} />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};
