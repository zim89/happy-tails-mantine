import { Table } from '@mantine/core';
import Image from 'next/image';

import styles from './CategoryRow.module.css';

import UpdateCategory from '@/modules/UpdateCategoryModal/UpdateCategoryModal';
import DeleteCategory from '@/modules/DeleteCategoryModal/DeleteCategoryModal';

import { Category } from '@/shared/types/types';

export default function CategoryRow(category: Category) {
  return (
    <Table.Tr className={styles.categoryRow}>
      <Table.Td>
        <Image
          src={category.imgSrc || '/images/no-image.512x512.png'}
          width={24}
          height={24}
          alt={category.name}
        />
      </Table.Td>
      <Table.Td>{category.name}</Table.Td>
      <Table.Td>{category.productCount}</Table.Td>
      <Table.Td className='flex flex-col gap-3'>
        <UpdateCategory categoryLine={{ ...category }} />
        <DeleteCategory categoryLine={{ ...category }} />
      </Table.Td>
    </Table.Tr>
  );
}
