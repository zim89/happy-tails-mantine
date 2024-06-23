import { Menu, UnstyledButton } from '@mantine/core';
import {
  Eye,
  Edit2,
  MoreHorizontal,
  Trash2,
  FolderDown,
  AlertTriangle,
  Check,
} from 'lucide-react';
import Link from 'next/link';

import { Post } from '@/shared/api/postApi';
import { useNotification } from '@/shared/hooks/useNotification';
import Notify from '@/components/Notify';
import DeletePostModal from '@/modules/DeletePostModal';
import ArchivePostModal from '@/modules/ArchivePostModal';

type Props = {
  post: Post;
};
export const Actions = ({ post }: Props) => {
  const [
    setNotification_deleted,
    { props: props_deleted, clear: clear_deleted },
  ] = useNotification({
    failed: {
      text: 'Article deletion failed!',
      icon: <AlertTriangle size={24} fill='#DC362E' />,
      color: 'transparent',
    },
    success: {
      text: 'Article successfully deleted!',
      icon: <Check size={24} />,
      color: '#389B48',
    },
  });

  const [
    setNotification_archived,
    { props: props_archived, clear: clear_archived },
  ] = useNotification({
    failed: {
      color: 'transparent',
      icon: <AlertTriangle size={24} fill='#DC362E' />,
      text: 'Post archiving failed!',
    },
    success: {
      color: '#389B48',
      icon: <Check size={24} />,
      text: 'Post archived successfully!',
    },
  });

  return (
    <div className='flex justify-end gap-4'>
      <UnstyledButton
        classNames={{
          root: 'flex items-center justify-center border border-solid border-brand-grey-400 hover:bg-brand-grey-400 p-2 rounded-sm',
        }}
      >
        <Link href={`/admin/blogs/${post.id}/preview`}>
          <Eye size={16} color='black' />
        </Link>
      </UnstyledButton>
      <UnstyledButton
        classNames={{
          root: 'flex items-center justify-center border border-solid border-brand-grey-400 hover:bg-brand-grey-400 p-2 rounded-sm',
        }}
      >
        <Link href={`/admin/blogs/${post.id}`}>
          <Edit2 size={16} color='black' />
        </Link>
      </UnstyledButton>

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
            <ArchivePostModal
              id={post.id}
              setNotification={setNotification_archived}
            />
          </Menu.Item>
          <Menu.Item
            leftSection={<Trash2 size={16} />}
            className='rounded-none hover:bg-brand-grey-200'
          >
            <DeletePostModal
              id={post.id}
              setNotification={setNotification_deleted}
            />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Notify {...props_deleted} onClose={clear_deleted} />
      <Notify {...props_archived} onClose={clear_archived} />
    </div>
  );
};
