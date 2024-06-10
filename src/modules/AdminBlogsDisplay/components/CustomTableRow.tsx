import { Table } from '@mantine/core';
import Image from 'next/image';

import { formatDateFromUnix } from '@/shared/lib/helpers';
import { Post } from '@/shared/api/postApi';
import { CustomBadge } from '@/components/Badge';
import { Actions } from './Actions';

type Props = {
  row: Post;
};

export const CustomTableRow = ({ row }: Props) => {
  return (
    <Table.Tr className='flex items-center px-4 py-3'>
      <Table.Td className='relative mr-8 min-h-[120px] min-w-[120px]'>
        <Image
          src={row.posterImgSrc}
          layout='fill'
          className='object-cover'
          alt={row.title}
        />
      </Table.Td>
      <Table.Td className='max-w-[760px]'>
        <hgroup>
          <h3 className='mb-2 w-full max-w-[600px] overflow-hidden text-ellipsis whitespace-nowrap text-lg'>
            {row.title}
          </h3>
          <p className='font-light'>{formatDateFromUnix(row.createdAt)}</p>
        </hgroup>
      </Table.Td>
      <Table.Td>
        <CustomBadge
          color={row.postStatus.toLowerCase()}
          name={row.postStatus}
          palette={{
            published: '#389B48',
            draft: '#FBBC04',
            archived: '#B4B4B4',
          }}
        />
      </Table.Td>
      <Table.Td className='ml-auto pl-11'>
        <Actions post={row} />
      </Table.Td>
    </Table.Tr>
  );
};
